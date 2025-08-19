import { createStoreWithReducers } from '../redux';
declare let storeInstance: ReturnType<typeof createStoreWithReducers>['store'];
export declare const loadModules: (pluginNames: string[]) => Promise<void>;
export { storeInstance as store };
//# sourceMappingURL=moduleLoader.d.ts.map