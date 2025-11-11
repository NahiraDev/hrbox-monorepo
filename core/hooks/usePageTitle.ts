import { useEffect } from 'react';
import { useMatches } from '@tanstack/react-router';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import { applyPageTitle } from '@hrbox/core/config/theme/domains';

export function usePageTitle() {
  const matches = useMatches();
  const currentPanel = useAppSelector((state: any) => state.auth.currentPanel);

  useEffect(() => {
    if (!currentPanel) return;

    const currentRoute = matches[matches.length - 1];
    const routeContext = currentRoute?.context as any;
    const pageTitle = routeContext?.pageTitle;

    applyPageTitle(currentPanel, pageTitle);
  }, [matches, currentPanel]);
}