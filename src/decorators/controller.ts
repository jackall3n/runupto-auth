function Controller(path: string) {
  return function (constructor: any) {
    if (!constructor.__ROUTER__) {
      constructor.__ROUTER__ = {};
    }

    const metadata = constructor.__ROUTER__;
    metadata.path = path;
  }
}


export { Controller };
