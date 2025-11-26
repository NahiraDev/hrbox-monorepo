import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hrbox/core/redux/hooks';
import { initTheme } from '@hrbox/core/redux/slices/themeSlice';
import { setDomainTheme, setCurrentPanel } from '@hrbox/core/redux/slices/authSlice';

import {
  getCurrentDomain,
  getDomainConfig,
  applyFavicon,
  applyPageTitle,
  applyMetaTags,
  applyDomainTheme, getDomainTheme,
} from '@hrbox/core/config/theme/domains';
import { Panel } from "@hrbox/core/config/theme";

export function useDomainInit() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state: any) => state.theme.mode);
  const domainTheme = useAppSelector((state: any) => state.auth.domainTheme);
  const currentPanel = useAppSelector((state: any) => state.auth.currentPanel);
  const selectedRole = useAppSelector((state: any) => state.auth.selectedRole);
  const isAuthenticated = useAppSelector((state: any) => state.auth.isAuthenticated);

  useEffect(() => {
    const detectedDomain = getCurrentDomain();
    if (!domainTheme || domainTheme !== detectedDomain) {
      dispatch(setDomainTheme(detectedDomain));
    }

    getDomainConfig(detectedDomain);
    applyFavicon(detectedDomain);
    applyPageTitle(detectedDomain);
    applyMetaTags(detectedDomain);
    getDomainTheme()
  }, []);

  useEffect(() => {
    if (domainTheme && themeMode) {
      dispatch(initTheme());
      applyDomainTheme(domainTheme, themeMode);
      setCurrentPanel(currentPanel)
    }
  }, [domainTheme, themeMode]);

  useEffect(() => {
    if (!isAuthenticated || !selectedRole || !currentPanel) return;

    // if (currentPanel !== domainTheme) {
    //   redirectToCorrectDomain(currentPanel);
    // } else {
    //   console.log('✅ User has access to this domain');
    // }
  }, [isAuthenticated, selectedRole, currentPanel, domainTheme]);
}

//TODO: Pack Nashe
// function redirectToCorrectDomain(panel: Panel) {
//   const domainMap: Record<Panel, string> = {
//     [Panel.HRLINK]: 'https://front.hrbox.me',
//     [Panel.HRBOX]: 'https://react.hrbox.me',
//     [Panel.SUPER_ADMIN]: 'https://admin.hrbox.me',
//   };

//   const targetDomain = domainMap[panel];

//   if (targetDomain && !window.location.href.includes(targetDomain)) {
//     console.log('🔄 Redirecting to correct domain:', targetDomain);
//     window.location.href = targetDomain;
//   }
// }