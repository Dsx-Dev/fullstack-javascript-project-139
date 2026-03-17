import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        chat: {
          headerLink: 'Hexlet Chat',
          send: 'Send',
          placeholder: 'Enter message...',
        },
        login: {
          header: 'Log in',
          username: 'Your nickname',
          password: 'Password',
          submit: 'Log in',
          noAccount: 'Don’t have an account?',
          signup: 'Sign up',
        },
        signup: {
          header: 'Sign up',
          username: 'Username',
          password: 'Password',
          confirm: 'Confirm password',
          submit: 'Sign up',
        },
        channels: {
          created: 'Channel created',
          renamed: 'Channel renamed',
          removed: 'Channel removed',
        },
        modals: {
          add: 'Add channel',
          remove: 'Remove channel',
          rename: 'Rename channel',
          cancel: 'Cancel',
          submit: 'Send',
          confirm: 'Remove',
          name: 'Channel name',
        },
        errors: {
          auth: 'Username or password are incorrect',
          userExists: 'Already exists',
          minMax: 'Must be from 3 to 20 characters',
          minPass: 'Must be > 6 characters',
          matching: 'Passwords must match',
          network: 'Network error',
          required: 'Required field',
        },
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;