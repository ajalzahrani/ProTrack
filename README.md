# **ProTrack**

ProTrack is a mobile application designed for iOS that helps users keep track of their progress while doing any type of training. The app allows users to schedule routine, set up exercises and workouts, and log weight and reps for each exercise. With ProTrack, users can see their progress over time, stay motivated, and reach their fitness goals faster.

## Features

- [x] Schedule training sessions
- [x] Build workouts and exercises
- [x] Log workout sessions
- [x] View session history & statistics
- [ ] Get notifications

## [Todos](./TODO.md)

## Usage

To use the app, follow these steps:

1. Open the app on your iOS device.
1. Add new routine.
1. Select created routine.
1. Add new workout.
1. Add exercises for the new workout.
1. From routine screen select the workout and press START to start session.
1. Log each SET during the session.
1. End the session.

### Run on specifice device

Choose your device from this list:

```terminal
xcrun simctl list devices
```

Run the following command

```terminal
yarn ios --simulator "iPhone 14 Pro (16.0)"
```

or

```terminal
yarn ios --udid "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

or you can add command to package.json

```json
"sim": "react-native run-ios --udid \"A461E7AB-FAB7-42D4-90AD-3E321338E887\""
```

### Run the following command if xcode updated

```console
cd ios && pod deintegrate
cd .. && pod install OR arch -x86_64 npx pod install
npx react-native clean
rm -rf /ios/build
npx react-native run-ios
```

and if you running flipperKit in your project you should remove it using [Removing+FlipperKit](./RemoveFlipperKit.md)

you can also delete simulator cache using:

```terminal
cd ~/Library/Developer/CoreSimulator/Caches && rm -rf dyld
```

## Support

If you have any questions or issues with the app, please contact at alzahrani.abdulrahman3@gmail.com.

## Contributing

I welcome contributions from developers who would like to help improve the app. If you're interested in contributing, please contact me at alzahrani.abdulrahman3@gmail.com, or you are free to make PR

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
