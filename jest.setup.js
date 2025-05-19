// jest.setup.js
import './src/packages/ui/theme/unistyles'; // Ensure this path is correct
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('expo-linear-gradient', () => { 
  return {
    LinearGradient: jest.fn(() => null),
  };
});

jest.mock('react-native-unistyles', () => {
  const actualUnistyles = jest.requireActual('react-native-unistyles');
  return {
    ...actualUnistyles,
    UnistylesRegistry: {
      addBreakpoints: jest.fn().mockReturnThis(),
      addThemes: jest.fn().mockReturnThis(),
      addConfig: jest.fn().mockReturnThis(),
    },
  };
});

jest.mock('i18next', () => ({
  use: jest.fn().mockReturnThis(),
  init: jest.fn(),
  t: (key) => key, 
}));

jest.mock('react-native-device-info', () => mockRNDeviceInfo)

jest.mock('expo-router', () => ({
  router: {
      push: jest.fn(),
      back: jest.fn(),
  },
  useFocusEffect: jest.fn(),
  useNavigation: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-localize', () => {
  return {
    getLocales: () => [
      { countryCode: 'ES', languageTag: 'es-ES', languageCode: 'es', isRTL: false },
    ],
    findBestAvailableLanguage: () => ({
      languageTag: 'es-ES',
      isRTL: false,
    }),
    getCountry: () => 'ES',
  };
});

jest.mock("react-native-keyboard-controller", () =>
  require("react-native-keyboard-controller/jest"),
);

// mock animations

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Animated.timing = () => ({ start: jest.fn() });
  RN.Animated.loop = () => ({ start: jest.fn() });
  RN.Animated.value = jest.fn();
  return RN;
}
);

jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: jest.fn().mockImplementation(({ children}) => children )
}))

global.setImmediate = global.setImmediate || function (callback) {
  setTimeout(callback, 0);
};