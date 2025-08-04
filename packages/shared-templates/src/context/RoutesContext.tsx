import { createContext, useContext } from 'react';
import type {RouteObject} from 'react-router-dom';
import * as React from "react";

const RoutesContext = createContext<RouteObject[]>([]);

export const useProjectRoutes = (): RouteObject[] => {
  const context = useContext(RoutesContext);
  if (context === undefined) {
    console.error('useProjectRoutes must be used within a RoutesProvider');
    return [];
  }
  return context;
};
interface RoutesProviderProps {
  children: React.ReactNode;
  routes: RouteObject[];
}

export const RoutesProvider: React.FC<RoutesProviderProps> = ({ children, routes }) => {
  return (
    <RoutesContext.Provider value={routes}>
      {children}
    </RoutesContext.Provider>
  );
};
