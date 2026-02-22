import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        chat: { headerLink: 'Hexlet Chat', channels: 'Channels', send: 'Send', messages_one: '{{count}} message', messages_other: '{{count}} messages' },
        login: { header: 'Login', username: 'Username', password: 'Password', submit: 'Log in', logout: 'Logout', noAccount: 'No account?', signup: 'Registration' },
        signup: { header: 'Registration', username: 'Username', password: 'Password', confirm: 'Confirm password', submit: 'Register' },
        channels: { created: 'Channel created', renamed: 'Channel renamed', removed: 'Channel removed' },
        modals: { add: 'Add channel', remove: 'Remove channel', rename: 'Rename channel', cancel: 'Cancel', submit: 'Send', confirm: 'Remove' },
        errors: { network: 'Connection error', loading: 'Failed to load data', userExists: 'User already exists', auth: 'Invalid username or password' },
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});
export default i18n;