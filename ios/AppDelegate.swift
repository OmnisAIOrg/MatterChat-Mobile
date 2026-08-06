import Expo
import React
import ReactAppDependencyProvider
import Firebase
import Bugsnag
import WatchConnectivity
import PushKit

@UIApplicationMain
public class AppDelegate: ExpoAppDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?
  var watchConnection: WatchConnection?

  public override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    // IMPORTANT: Initialize MMKV encryption FIRST, before any other initialization
    // This reads existing encryption key or generates a new one for fresh installs
    // Must run before Firebase, Bugsnag, and React Native start
    MMKVKeyManager.initialize()
    
    FirebaseApp.configure()
    Bugsnag.start()
    ReplyNotification.configure()
    if !VoipRegion.isChina() {
      VoipService.voipRegistration()
      RNCallKeep.setup([
        "appName": "Rocket.Chat",
        "supportsVideo": false,
        "maximumCallGroups": 1,
        "maximumCallsPerCallGroup": 1,
        "includesCallsInRecents": true
      ])
    }
      
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory
    bindReactNativeFactory(factory)

#if os(iOS) || os(tvOS)
    window = UIWindow(frame: UIScreen.main.bounds)
    factory.startReactNative(
      withModuleName: "RocketChatRN",
      in: window,
      launchOptions: launchOptions)
#endif

    // The app's frame is MatterChat green (same green as the app icon). The window is the
    // bottom-most layer, so painting it here keeps the status-bar strip green instead of
    // showing a neutral band above full-bleed screens.
    window?.backgroundColor = UIColor(red: 0x2A / 255.0, green: 0x96 / 255.0, blue: 0x45 / 255.0, alpha: 1.0)
    window?.rootViewController?.view.backgroundColor = window?.backgroundColor

    let result = super.application(application, didFinishLaunchingWithOptions: launchOptions)

    // Initialize boot splash
    if let rootViewController = window?.rootViewController {
      RNBootSplash.initWithStoryboard("LaunchScreen", rootView: rootViewController.view)
    }

    // Initialize SSL Pinning
     SSLPinning().migrate()

    // Initialize Watch Connection
    watchConnection = WatchConnection(session: WCSession.default)

    return result
  }

  // Linking API
  public override func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey: Any] = [:]
  ) -> Bool {
    return super.application(app, open: url, options: options) || RCTLinkingManager.application(app, open: url, options: options)
  }

  // Universal Links
  public override func application(
    _ application: UIApplication,
    continue userActivity: NSUserActivity,
    restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
  ) -> Bool {
    let result = RCTLinkingManager.application(application, continue: userActivity, restorationHandler: restorationHandler)
    return super.application(application, continue: userActivity, restorationHandler: restorationHandler) || result
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
