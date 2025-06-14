import localforage from 'localforage';

const db = localforage.createInstance({
  name: 'GameVaultDB'
});

export default db;
