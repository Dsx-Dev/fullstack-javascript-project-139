import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          login: {
            header: 'Login',
            username: 'Your username',
            password: 'Password',
            submit: 'Log in',
            noAccount: 'Don’t have an account?',
            signup: 'Registration',
          },
          signup: {
            header: 'Registration',
            username: 'Username',
            password: 'Password',
            confirm: 'Confirm password',
            submit: 'Register',
          },
          chat: {
            channels: 'Channels',
            messages: 'messages',
            placeholder: 'Enter message...',
            send: 'Send',
          },
          modals: {
            add: 'Add channel',
            remove: 'Remove channel',
            rename: 'Rename channel',
            cancel: 'Cancel',
            submit: 'Send',
            confirm: 'Confirm',
          },
          errors: {
            required: 'Required field',
            minMax: 'From 3 to 20 characters',
            minPass: 'At least 6 characters',
            matching: 'Passwords must match',
            userExists: 'This user already exists',
            auth: 'Invalid username or password',
          }
        },
      },
    },
    lng: 'en', // Localización predeterminada obligatoria
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;