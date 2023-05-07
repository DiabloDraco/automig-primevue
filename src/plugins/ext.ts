declare global {
  interface Object {
    setItem<T>(key: string, hashFn?: Function): T;

    pluck<T>(key: string): T;
  }

  interface String {
    toObject<T>(pluck?: string): T;

    toItem(separator: string, index: number): String;

    getItem(key: string): String;

    setItem(key: string): String;

    base64Encode(): String;

    base64Decode(): String;
  }
}

Object.defineProperty(Object.prototype, "setItem", {
  value: function setItem<T>(key: string, hashFn?: Function): T {
    if (typeof this === "object") {
      if (hashFn) {
        localStorage.setItem(key, hashFn(JSON.stringify(this)));
        return this as T;
      }

      localStorage.setItem(key, JSON.stringify(this));

      return this as T;
    }
    return this as T;
  },
  writable: true,
  configurable: true,
});

Object.defineProperty(Object.prototype, "pluck", {
  value: function setItem(key: string) {
    if (typeof this === "object") {
      return this[key];
    }
  },
  writable: true,
  configurable: true,
});

String.prototype.base64Decode = function (): String {
  return atob(this.toString());
};

String.prototype.base64Encode = function (): String {
  return btoa(this.toString());
};

String.prototype.toObject = function <T>(key?: string): T {
  try {
    const obj = JSON.parse(this.toString());
    return key ? obj[key] : obj;
  } catch (e) {
    //@ts-ignore
    return null;
  }
};

String.prototype.toItem = function (separator: string, index: number): String {
  return this.split(separator)[index] || this;
};

String.prototype.getItem = function (key: string): String {
  return localStorage.getItem(key) || this;
};

String.prototype.setItem = function (key: string) {
  localStorage.setItem(key, this.toString());
  return this;
};

export {};
