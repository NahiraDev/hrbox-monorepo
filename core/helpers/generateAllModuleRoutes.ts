import { moduleRegistry } from '@hrbox/modules/registry';
import { generateModuleRoutes } from "@core/routes/generator";
import { ModulePlugin } from '@hrbox/modules/types';

export function generateAllModuleRoutes(p0: ModulePlugin) {
  const allModules = moduleRegistry.getAllModules();

  return allModules.flatMap((module) => {
    try {
      return generateModuleRoutes(module);
    } catch (error) {
      console.error(`❌ Failed to generate routes for module: ${module.name}`, error);
      return [];
    }
  });
}