import type { EnhancedStore } from '@reduxjs/toolkit';
import type { Persistor } from 'redux-persist/es/types';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { PersistGate } from 'redux-persist/integration/react';
// import { StrictMode } from 'react';
import { ModalProvider } from 'core/context';

import { i18n } from '../translate';
import { AuthProvider } from '../context';
import { RootRouterLoader } from '../routes';
import { AppModal } from '../components';

import { HeroProviderWrapper } from './provider';

export const renderApp = (id: string, { store, persistor }: { store: EnhancedStore; persistor: Persistor }) => {
  const rootEl = document.getElementById(id);

  if (!rootEl) {
    return;
  }

  const root = ReactDOM.createRoot(rootEl);

  root.render(
    // <StrictMode>
    <>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <HeroProviderWrapper>
              <ReduxProvider store={store}>
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                  <ModalProvider>
                    <AppModal />
                    <RootRouterLoader />
                  </ModalProvider>
                </PersistGate>
              </ReduxProvider>
            </HeroProviderWrapper>
          </AuthProvider>
        </I18nextProvider>
      </BrowserRouter>
    </>,
    // </StrictMode>,
  );
};
