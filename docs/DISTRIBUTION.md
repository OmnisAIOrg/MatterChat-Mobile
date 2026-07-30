# MatterChat Mobile — Build & Distribution Runbook

How to get this app into people's hands, from local dev to TestFlight. Current as of 2026-07-30.

## Status at a glance

| Lane                                       | State                                                                              | Blocked on                                         |
| ------------------------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------- |
| Local dev (Debug + Metro)                  | ✅ working                                                                         | —                                                  |
| **Release build (bundled JS, standalone)** | ✅ **working** — verified booting on the simulator with no Metro                   | —                                                  |
| CI simulator artifact                      | ✅ working (`matterchat-ios.yml` → MatterChat-Simulator.app.zip, 14-day retention) | —                                                  |
| Device build / TestFlight                  | ⏳ ready to wire                                                                   | Apple Developer enrollment (in progress)           |
| Android                                    | ⏳ untouched                                                                       | Android signing config + CI lane                   |
| Push notifications                         | ⏳ needs setup                                                                     | APNs key (Apple account) + a push gateway decision |

## Local builds

Debug (Metro serves JS live — for development):

```bash
corepack pnpm install && corepack pnpm start   # Metro
xcodebuild -workspace ios/RocketChat.xcworkspace -scheme RocketChat -configuration Debug \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' -derivedDataPath ios/build \
  CODE_SIGN_IDENTITY="-"
```

Release (bundled Hermes JS — what users run; no Metro needed):

```bash
xcodebuild -workspace ios/RocketChat.xcworkspace -scheme RocketChat -configuration Release \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' -derivedDataPath ios/build-release \
  CODE_SIGN_IDENTITY="-"
```

Gotchas (all already handled in-repo, listed so nobody re-trips):

- Pods need Ruby 3.3 + `LANG=en_US.UTF-8`; after `pod install`, Pods/fmt needs the consteval patch
  (chmod u+w `Pods/fmt/include/fmt/base.h`, set `FMT_USE_CONSTEVAL 0`) on Xcode 26.
- NEVER build with `CODE_SIGNING_ALLOWED=NO` — it strips the App Group entitlement and MMKV
  asserts at launch. Ad-hoc (`CODE_SIGN_IDENTITY="-"`) is the simulator answer.
- The Bugsnag source-map upload phase skips itself when `BUGSNAG_API_KEY` is unset (our fork).

## The path to TestFlight (once Apple enrollment completes)

1. **Apple Developer Program** enrolled (org). Get the **Team ID** (Membership page).
2. Register the App ID — decision on record: rename bundle to `com.omnisai.matterchat`
   (currently `chat.rocket.ios` + suffixed extensions) **once**, with capabilities:
   App Groups, Push Notifications, Associated Domains.
3. In App Store Connect: create the app, then an **API key** (App Manager role) and load it as repo
   secrets — never paste values in chat:
   ```bash
   gh secret set APP_STORE_CONNECT_API_KEY_ID -R OmnisAIOrg/MatterChat-Mobile
   gh secret set APP_STORE_CONNECT_API_ISSUER_ID -R OmnisAIOrg/MatterChat-Mobile
   gh secret set APP_STORE_CONNECT_API_KEY -R OmnisAIOrg/MatterChat-Mobile < AuthKey_XXXXXXXXXX.p8
   ```
4. Add a `matterchat-testflight.yml` workflow: fastlane match/gym with cloud signing +
   `pilot` upload. (The AI dev can wire this the same day the secrets land.)
5. **Push**: create an APNs key, configure the workspace's push gateway (admin → Push settings) —
   the Rocket.Chat community gateway only serves the official app's bundle ids, so the fork needs
   its own gateway or direct APNs config server-side.

## Android (later)

`android/` builds via `build-android.yml` upstream patterns; needs our keystore + package rename
mirroring the iOS decision. No local Android SDK on the current dev Mac — CI lane only.
