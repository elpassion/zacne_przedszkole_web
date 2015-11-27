class LocalStorage {
  setObject(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  getObject(name) {
    const item = JSON.parse(localStorage.getItem(name));
    return item || {};
  }
}

export default new LocalStorage();
