import { createStoreWithReducers, createRootReducer } from '../redux';

import { serviceRegistry } from './serviceRegistry';

let storeInstance: ReturnType<typeof createStoreWithReducers>['store'];

export const loadModules = async (pluginNames: string[]) => {
  if (!storeInstance) {
    const { store } = createStoreWithReducers();

    storeInstance = store;
  }

  for (const name of pluginNames) {
    try {
      const plugin: any = await import(`../../modules/${name}/app/register.ts`);

      serviceRegistry.registerPlugin(plugin.default);
    } catch (err) {
      console.warn(`Module ${name} could not be loaded`, err);
    }
  }

  storeInstance.replaceReducer(createRootReducer(serviceRegistry.getAllReducers()));

  serviceRegistry.getAllApis().forEach((api) => {
    storeInstance.dispatch(api.util.resetApiState());
  });

  await serviceRegistry.runPrefetch();
};

export { storeInstance as store };
