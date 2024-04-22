## About the app!

This apps allows you to track your favorite activity like running or biking - even when the app is backgrounded!
You can then save it to your device to track your progress.

<img width="300px" src="src\assets\images\Screenshot_2.png" alt="screenshot_2" /><img width="300px" src="src\assets\images\Screenshot_1.png" alt="screenshot_1" />

## Development Setup

1. Follow the [official Expo guide](https://docs.expo.dev/guides/local-app-development/#android) to setup your enviroment
2. Make sure to have `yarn` installed
3. Run `yarn install` to install the dependencies
4. Setup your [Google Maps API key](https://docs.expo.dev/versions/latest/sdk/map-view/#android) and paste it in `app.json`

## Building the app locally

#### Android:

1. Run `yarn android` to build the app on your simulator
   - Note: This will run `npx expo prebuild` to generate native code if it's not present. For subsequent builds, you will need to manually run `npx expo prebuild` to ensure the native code is freshly synchronized with your local configuration.

#### iOS:

🚧 Not yet 🚧
