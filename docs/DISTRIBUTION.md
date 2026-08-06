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

## TestFlight

`.github/workflows/matterchat-testflight.yml` builds a signed Release archive and uploads it to
TestFlight. It supersedes step 4 above — it uses **xcodebuild + `altool` with App Store Connect
cloud signing**, not fastlane `match`/`gym`/`pilot`. No certificates, profiles, or keychains are
stored in the repo; xcodebuild mints what it needs via `-allowProvisioningUpdates`.

**How to run it**

1. GitHub → Actions → **MatterChat TestFlight (signed release)** → *Run workflow*.
2. Optionally set **build_number**. Leave it blank to use the value in the Xcode project
   (`CURRENT_PROJECT_VERSION`, currently `1`). App Store Connect **rejects a build number it has
   already seen**, so after the first upload you must pass a higher one each run. It is applied to
   all four targets at once, which ASC requires.
3. ~40–60 min later the build appears in App Store Connect → TestFlight, in "Processing" for
   another 5–15 min before it is assignable to testers.

There is deliberately **no `push:` trigger** — every run burns a build number.

**What it needs (already configured)**

- Repo secrets: `APP_STORE_CONNECT_API_KEY_ID`, `APP_STORE_CONNECT_API_ISSUER_ID`,
  `APP_STORE_CONNECT_API_KEY` (the raw `.p8` contents). The workflow writes the key to
  `~/private_keys/AuthKey_<KEY_ID>.p8` at mode 600 — that exact path/filename is how `altool`
  auto-discovers it, so don't "tidy" it.
- Team ID `P8S9U28C8B`; bundle ids `com.omnisai.matterchat` + `.ShareExtension`,
  `.NotificationService`, `.watchkitapp`. All four must exist as App IDs in the developer portal
  with matching capabilities (App Groups, Push Notifications, Associated Domains) or provisioning
  fails at archive time.

**Gotchas baked into the workflow**

- The `Release` config in `project.pbxproj` is still pinned to the fork's old fastlane setup:
  `CODE_SIGN_STYLE = Manual` plus `PROVISIONING_PROFILE_SPECIFIER` values like
  `match AppStore chat.rocket.ios` — profiles that don't exist in our account and name a bundle id
  we no longer ship. The workflow overrides `CODE_SIGN_STYLE=Automatic` and blanks
  `PROVISIONING_PROFILE_SPECIFIER` **on the xcodebuild command line** so local/manual builds are
  unaffected. If you ever clean up the project file, drop these overrides too.
- The Watch App's `Release` config has an empty `DEVELOPMENT_TEAM`; the command-line
  `DEVELOPMENT_TEAM=P8S9U28C8B` covers it.
- The fmt/consteval patch is re-applied after `pod install` (`Pods/` is gitignored, so CI always
  gets a pristine fmt). Note the `ios/Podfile` `post_install` hook that passes `-DFMT_CONSTEVAL=`
  is **not sufficient on its own** — `base.h` re-`#define`s that macro after the command-line `-D`,
  so the header wins. Forcing `FMT_USE_CONSTEVAL` to `0` in `base.h` is the fix that sticks.
- No `-sdk` flag on the archive: it would force the Watch App target onto the iOS SDK
  ("no such module 'WatchKit'"). `-destination 'generic/platform=iOS'` alone picks SDKs per target.
- The signed `.ipa` is uploaded as a build artifact (14-day retention) even when the TestFlight
  upload itself fails, so a duplicate-build-number rejection doesn't cost a full rebuild.
