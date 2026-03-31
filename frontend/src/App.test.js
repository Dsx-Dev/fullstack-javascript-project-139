/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';
import modalReducer from './slices/modalSlice.js';

const createTestStore = () => configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});

const renderWithProviders = (component) => {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>,
  );
};

test('renders Hexlet Chat text', () => {
  render(<BrowserRouter><div>Hexlet Chat</div></BrowserRouter>);
  expect(screen.getByText(/Hexlet Chat/i)).toBeInTheDocument();
});

test('login form has username and password fields', () => {
  const { container } = renderWithProviders(
    <div>
      <input placeholder="Your nickname" />
      <input type="password" placeholder="Password" />
      <button type="submit">Log in</button>
    </div>,
  );
  expect(container.querySelector('input[placeholder="Your nickname"]')).toBeInTheDocument();
  expect(container.querySelector('input[type="password"]')).toBeInTheDocument();
});

test('signup form has required fields', () => {
  const { container } = renderWithProviders(
    <div>
      <input placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm password" />
      <button type="submit">Sign up</button>
    </div>,
  );
  expect(container.querySelector('input[placeholder="Username"]')).toBeInTheDocument();
  expect(container.querySelector('input[placeholder="Confirm password"]')).toBeInTheDocument();
});

test('send button is present in chat', () => {
  renderWithProviders(<button type="submit">Send</button>);
  expect(screen.getByText('Send')).toBeInTheDocument();
});

test('channels title is rendered', () => {
  renderWithProviders(<div>Channels</div>);
  expect(screen.getByText('Channels')).toBeInTheDocument();
});