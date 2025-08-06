import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';
import {PersistGate} from 'redux-persist/integration/react';
import {DarkModeProvider} from '@hrbox/shared-templates';
import {store, persistor} from '@hrbox/shared-templates';
import {i18n} from '@hrbox/shared-translation';
import './index.css';
import {HeroProviderWrapper} from "./provider";

import {RootRouterLoader} from '@hrbox/shared-navigations';
import {StrictMode} from "react";

export const renderApp = (id: string = 'root') => {
  const root = document.getElementById(id);
  if (!root) {
    console.error(`Element with id "${id}" not found`);
    return;
  }
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <HeroProviderWrapper>
            <ReduxProvider store={store}>
              <PersistGate
                loading={<div>Loading...</div>}
                persistor={persistor}
                onBeforeLift={() => {
                  console.log('Rehydration complete');
                }}>
                <DarkModeProvider>
                  <RootRouterLoader/>
                </DarkModeProvider>
              </PersistGate>
            </ReduxProvider>
          </HeroProviderWrapper>
        </BrowserRouter>
      </I18nextProvider>
    </StrictMode>,
  );
}
