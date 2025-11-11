import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hrbox/core/redux/hooks';
// import { setCurrentDomain } from '@hrbox/core/redux/slices/authSlice';
import { initTheme } from '@hrbox/core/redux/slices/themeSlice';
import {
  getCurrentDomain,
  getDomainConfig,
  applyFavicon,
  applyPageTitle,
  applyMetaTags,
  applyDomainTheme,
} from '@hrbox/core/config/theme/domains';

export function useDomainInit() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state: any) => state.theme.mode);
  const currentPanel = useAppSelector((state: any) => state.auth.currentPanel);

  useEffect(() => {
    console.log('🚀 Initializing domain...');

    const detectedPanel = getCurrentDomain();
    const config = getDomainConfig(detectedPanel);

    //
    // if (!currentPanel || currentPanel !== detectedPanel) {
    //   dispatch(setCurrentPanel(detectedPanel));
    // }

    applyFavicon(detectedPanel);
    applyPageTitle(detectedPanel);
    applyMetaTags(detectedPanel);

    dispatch(initTheme());

    console.log('✅ Domain initialized:', detectedPanel);
  }, [dispatch, currentPanel]);

  // 5️⃣ اعمال Theme وقتی mode یا panel تغییر کرد
  useEffect(() => {
    if (currentPanel && themeMode) {
      applyDomainTheme(currentPanel, themeMode);
    }
  }, [currentPanel, themeMode]);
}