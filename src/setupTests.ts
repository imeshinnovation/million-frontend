import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.fetch = jest.fn();

Object.assign(global, { TextEncoder, TextDecoder });

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));