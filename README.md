# PerDiem


# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.



# Step 1: install node modules and pods for ios

To install node modules and pods, run the following command from the _root_ of your React Native project

### For iOS and Android both

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

### For iOS

```bash
cd ios

pod install
```

## Step 2: Start the Metro Server


First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.


Once your app starts in the Simulator, you can register with any email password and login with it.


After successfully login user will see Home screen with his email and logout button on top of the screen, user can logout with this button, Two buttons are also placed at the bottom of the screen to fetch data from API.