class Store {
  constructor() {
    this.store = {};
    this.listeners = {};
  }

  set(object) {
    Object.assign(this.store, object);
  }

  get(key, where) {
    if (key !== undefined && this.store[key]) {
      if (where !== undefined) {
        // если where число (как правило это id)
        if (/^\d+$/.test(where) && this.store[key][where]) {
          return this.store[key][where];
        }
        // если where объект
        else if (typeof where === "object") {
          let result = [];
          for (let i in this.store[key]) {
            let obj = this.store[key][i];
            let match = true;
            for (let key in where) {
              if (!obj[key] || obj[key] !== where[key]) {
                match = false;
                break;
              }
            }
            if (match) {
              result.push(obj);
            }
          }
          return result;
        }
        return null;
      }
      return this.store[key];
    }
    return null;
  }

  on = function(key, cb) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(cb);
  };

  emit = function() {
    const args = [].slice.call(arguments);
    const key = args.shift();
    const arListeners = this.listeners[key];
    if (arListeners && arListeners.length) {
      for (let i in arListeners) {
        let cb = arListeners[i];
        cb.apply(this, args);
      }
    }
  };

  off = function(key, cb = null) {
    const arListeners = this.listeners[key];
    if (arListeners && arListeners.length) {
      if (cb) {
        for (let i in arListeners) {
          if (arListeners[i] === cb) {
            arListeners.splice(i, 1);
          }
        }
      } else {
        this.listeners[key] = null;
        delete this.listeners[key];
      }
    }
  };
}

export default new Store();
