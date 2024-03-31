## How To Remove FlipperKit

1. Remove FlipperKit from CocoaPods:
   . Navigate to the ios directory of your React Native project.
   . Open the Podfile in a text editor.
   . Locate the section where FlipperKit is included (it should be under the target 'YourAppName' do section).
   . Remove the lines related to FlipperKit.
   . Save the Podfile.

2. Update CocoaPods:
   . Open Terminal.
   . Navigate to the root directory of your iOS project (where your Podfile is located).
   . Run pod install to update your CocoaPods dependencies.

3. Remove Flipper Configuration from AppDelegate:
   . Open your AppDelegate.m file located in the ios/YourAppName directory.
   . Remove any imports and lines of code related to Flipper.

4. Remove Flipper Files:
   . If you have any remaining Flipper-related files in your project (e.g., Flipper folder, FlipperConfig.h), you can manually delete them.

5. Clean and Rebuild:
   . After removing FlipperKit from your project, clean your Xcode project by deleting the ios/build directory.
   . Then rebuild your project by running npm run ios again.

By following these steps, you should be able to remove FlipperKit from your React Native project. However, make sure that removing FlipperKit doesn't cause any other dependencies or features in your project to break. If you encounter any issues, you can always reinstall FlipperKit or seek further assistance.

## Why To Remove FlipperKit

- FlipperKit preventing react-native from build producing this error

```terminal
The following build commands failed:
        CompileC /Users/aalzahrani/Documents/GitHub/rn/ProTrack/ios/build/Pods.build/Debug-iphonesimulator/FlipperKit.build/Objects-normal/arm64/FlipperPlatformWebSocket.o /Users/aalzahrani/Documents/GitHub/rn/ProTrack/ios/Pods/FlipperKit/iOS/FlipperKit/FlipperPlatformWebSocket.mm normal arm64 objective-c++ com.apple.compilers.llvm.clang.1_0.compiler (in target 'FlipperKit' from project 'Pods')
(1 failure)
```

So, I solve this by follow mentioned steps.
