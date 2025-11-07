import type { EnhancedStore } from '@reduxjs/toolkit';
import type { Persistor } from 'redux-persist/es/types';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { PersistGate } from 'redux-persist/integration/react';
import { StrictMode } from 'react';

import { i18n } from '@core/translate';
import { AuthProvider , ModalProvider} from '@core/context';
import { RootRouterLoader } from '@core/routes';

import { HeroProviderWrapper } from '@core/providers/HeroUIProvider';
import { AppModal } from 'shared/components';

export const renderApp = (id: string, { store, persistor }: { store: EnhancedStore; persistor: Persistor }) => {
  const rootEl = document.getElementById(id);

  if (!rootEl) {
    return;
  }

  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <StrictMode>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <HeroProviderWrapper>
              <ReduxProvider store={store}>
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                  <ModalProvider store={store}>
                    <AppModal/>
                    <RootRouterLoader />
                  </ModalProvider>
                </PersistGate>
              </ReduxProvider>
            </HeroProviderWrapper>
          </AuthProvider>
        </I18nextProvider>
      </BrowserRouter>
    </StrictMode>,
  );
};
