const store = {};

const localforage = {
  setItem: jest.fn((key, value) => {
    store[key] = value;
    return Promise.resolve(value);
  }),
  getItem: jest.fn((key) => {
    return Promise.resolve(store[key] || null);
  }),
  removeItem: jest.fn((key) => {
    delete store[key];
    return Promise.resolve();
  }),
  clear: jest.fn(() => {
    Object.keys(store).forEach(key => delete store[key]);
    return Promise.resolve();
  }),
  keys: jest.fn(() => {
    return Promise.resolve(Object.keys(store));
  }),
  length: jest.fn(() => {
    return Promise.resolve(Object.keys(store).length);
  })
};

module.exports = localforage;
