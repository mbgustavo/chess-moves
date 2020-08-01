import { Router } from 'express';
import { readdirSync } from 'fs';

const appRouter = Router();

/** Register all routes in src/routes */
const routersRegister = (): void => {
  readdirSync(__dirname).forEach((file): void => {
    // Avoid importing itself
    if (!file.includes('index')) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const router = require('./' + file);
      const path = router.path;
      appRouter.use(path, router.default);
    }
  });
};

routersRegister();

export { appRouter as AppRouter };
