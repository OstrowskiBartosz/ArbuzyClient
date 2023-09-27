// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { server } from './mocks/server';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from './store/store';
import { sessionChange } from './store/storeSlices/sessionSlice';

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

beforeAll(() => server.listen());
afterEach(() => {
  sessionStorage.clear();
  server.resetHandlers();
  act(() => store.dispatch(sessionChange(true)));
});
afterAll(() => {
  server.close();
  jest.clearAllMocks();
});

const MockProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};
export { MockProviders };
