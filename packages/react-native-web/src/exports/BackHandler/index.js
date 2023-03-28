function emptyFunction() {}

const BackHandler = {
  exitApp: emptyFunction,
  addEventListener() {
    return {
      remove: emptyFunction
    };
  },
  removeEventListener: emptyFunction
};

export default BackHandler;