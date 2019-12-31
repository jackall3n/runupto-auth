import { Application, Router } from 'express';

export default (app: Application | any, controllers: any[]) => {
  for (const C of controllers) {
    const router = <any>Router();
    const { __ROUTER__, __ROUTES__ } = C.prototype.constructor;

    if (!__ROUTER__) {
      console.warn('Unable to find router options');
      return;
    }

    if (!__ROUTES__) {
      console.warn('Unable to find router routes');
      return;
    }

    const { path } = __ROUTER__;
    const controller = new C();

    for (const [methodName, options] of Object.entries(__ROUTES__)) {
      const { method, path: methodPath } = options as { method: string, path: string };

      const methodType = method.toLowerCase();
      const methodBody = controller[methodName];

      router[methodType](methodPath, (...args: any[]) => methodBody.apply(controller, args));
    }

    app.use(path, router);
  }
}
