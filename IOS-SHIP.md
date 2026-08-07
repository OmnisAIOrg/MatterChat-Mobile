# Shipping MatterChat for iOS

What the app already does, what only you can do, and how to get a build onto a phone.

## Identity

| | |
|---|---|
| Bundle IDs | `com.omnisai.matterchat` + `.ShareExtension`, `.NotificationService`, `.watchkitapp` |
| App Group | `group.com.omnisai.matterchat` |
| Team | `P8S9U28C8B` |
| Associated domain | `applinks:app.matterchat.com` |
| Display name | MatterChat (app, share sheet, watch) |

`aps-environment` resolves from `APS_ENVIRONMENT`: `development` for Debug, `production` for
Release. This matters more than it looks — a distribution build signed with the sandbox value
registers a sandbox APNs token and then drops every production push without an error anywhere.

## TestFlight

Manual only, by design: every run consumes a build number.

```bash
gh workflow run matterchat-testflight.yml -R OmnisAIOrg/MatterChat-Mobile --ref matterchat -f build_number=<n>
```

`build_number` must be higher than the last build already on TestFlight. Leave it blank to keep
whatever is in the Xcode project.

The workflow archives with **cloud signing**: no certificates or profiles live in this repo and
there is no fastlane match keychain. `xcodebuild -allowProvisioningUpdates` talks to App Store
Connect with the API key in secrets and mints whatever profiles the four targets need.

Secrets already set: `APP_STORE_CONNECT_API_KEY_ID`, `APP_STORE_CONNECT_API_ISSUER_ID`,
`APP_STORE_CONNECT_API_KEY`.

The workflow file exists on both `matterchat` and `develop` — `workflow_dispatch` only fires for
workflows present on the default branch, which is `develop`.

### If the archive fails on provisioning

Cloud signing creates App IDs it needs, but it will not invent an **App Group** that does not
exist. In the developer portal, once:

1. Identifiers → App Groups → `group.com.omnisai.matterchat`.
2. Identifiers → the four App IDs above → enable **App Groups** (assign the group), **Push
   Notifications**, **Associated Domains**, **Sign in with Apple** on the main app.

Everything else the workflow handles.

## Push notifications

The client side is done: permission prompt, token registration (`registerPushToken`), the
Notification Service extension for rich pushes, and the entitlement above.

The server side is not, and cannot be — it needs an APNs key, which is yours to generate and
should never leave your hands:

1. Apple Developer → Keys → new key with **Apple Push Notifications service (APNs)** →
   download the `.p8` (one download, ever).
2. MatterChat admin → **Push**:
   - *Use default gateway* → **off**. Rocket.Chat's community gateway only serves official
     builds; a fork has to talk to APNs directly.
   - APN key: paste the `.p8` contents, key ID, team ID `P8S9U28C8B`.
   - Bundle id: `com.omnisai.matterchat`.
   - Production: **on** (matches the Release entitlement).

Until that is set, the app runs fine and simply never buzzes.

## Local builds

```bash
# Debug on the simulator (needs Metro)
xcodebuild -workspace ios/RocketChat.xcworkspace -scheme RocketChat -configuration Debug \
  -destination 'platform=iOS Simulator,name=iPhone 17' -derivedDataPath ios/build \
  CODE_SIGN_IDENTITY="-" build
```

Two traps worth knowing about, both already handled in CI:

- **Never** `CODE_SIGNING_ALLOWED=NO`. It strips the App Group entitlement and MMKV asserts on
  launch. `CODE_SIGN_IDENTITY="-"` is the ad-hoc signing that works.
- **Never** pass `-sdk iphoneos`. It forces the Watch App onto the iOS SDK and the build dies on
  `no such module 'WatchKit'`. Use `-destination` only.

For a standalone Release build with the JS embedded (proves the app runs with Metro dead), add
`FORCE_BUNDLING=1` — `react-native-xcode.sh` skips bundling for simulator destinations otherwise.

## Android

Not started. There is no local SDK on this machine, so it would be CI-only.
