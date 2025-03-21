# @weddesign/source

## Prerequisites

- Node.js v20.13.1

```https://nodejs.org/en```

- Yarn v1.22.19

```npm install --global yarn@1.22.19```

- Docker Desktop v4.32.0

- Android configuration

```https://reactnative.dev/docs/set-up-your-environment```

## Installation
1. Clone the project

```git clone https://github.com/NikolasSzwargot/weddesign.workspace.git```

2. Install dependencies

```yarn install```
## Scripts
This project uses several scripts to manage different tasks. Below is a list of the available scripts and their descriptions:

### Weddesign-mobile

```yarn prebuild weddesign-mobile```

Prebuild the app. Needed to do only once when first time setting up

```yarn run-android weddesign-mobile```

Run app on Android

```yarn run-ios weddesign-mobile```

Run app on IOS


### Mobile - DEPRACATED
- #### Build Mobile Application:

```yarn build:mobile```

  Builds the mobile application using Nx.

- #### Start Mobile Application:

```yarn start:mobile```

  Starts the mobile application using Nx.

- #### Run Mobile Application on Android:

```yarn start:mobile:android```

  Starts the mobile application on an Android device or emulator.

- #### Run Mobile Application on iOS:

```yarn start:mobile:ios```

Starts the mobile application on an iOS device or simulator.

- ### Setup Fetching:

For fetching to work, you need to edit `apps/mobile/android/app/src/main/res/xml/network_security_config.xml` and provide your PC ip like that:

```xml
<domain includeSubdomains="true">10.0.2.2</domain>
```

You also need to create a directory and a file `apps/weddesign-mobile/src/config/index.ts` for setting up your IP address. The content should look like that:

```ts
// local - CHANGE API_URL ip to yours
export const API_URL = 'http://your_ip:3000' as const;
```

### Backend
- #### Build Backend Application:

```yarn build:backend```

Builds the backend application using Nx.

- #### Start Backend Application:

```yarn start:backend```

Serves the backend application using Nx.

- #### Test Backend Application:

```yarn test:backend```

Runs tests for the backend application using Nx.

### Linting
- #### Lint All Projects:

```yarn lint```

Lints all affected projects using Nx. It also runs TypeScript's type checking.

- #### Fix Lint Issues:

```yarn lint:fix``` 

Lints all affected projects and attempts to automatically fix issues using Nx.

## Additional informations:

- Project uses nx (https://nx.dev)
- Project uses atomic design (https://atomicdesign.bradfrost.com/chapter-2/)
- Use Nest for backend (https://docs.nestjs.com)
- We use SwaggerUI to document changes on backend, configured on '/api' (HIGHLY RECOMMENDED TO USE, https://swagger.io/tools/swagger-ui/) 
- Use React Native for mobile frontend (https://reactnative.dev/docs/getting-started)
- Use styled components for styling react mobile frontend (https://styled-components.com/docs)
- If you want to install additional libraries for ready-to-go react components, consult it with the team (We don't want overkill things, but we need one library for some ready components and one for animations! Do the research, puppies!).
- We need translations for our frontend mobile app to avoid hardcoded strings! Find some good library (liker I8next but idk about that on mobile without next.js) Lena did the task about that. Please take care of it in your spare time
- .env should be setup for a future (We should do the task for it)
- We should also setup some automatic CLI like github actions in the future! (IT IS A MUST HAVE, NO DISCUSSION)
# We test frontend on production ONLY <3
