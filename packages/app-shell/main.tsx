import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { PersistGate } from "redux-persist/integration/react";
import { i18n } from "@package/app-translation";
import { createRootReducer } from "@package/app-states";
import { DarkModeProvider } from "@package/app-states";
import { createStoreWithReducers } from "@package/app-states";
import { RootRouterLoader } from "@package/app-navigations";
import { StrictMode } from "react";
import { HeroProviderWrapper } from "./provider";

const rootReducer = createRootReducer();

const { store, persistor } = createStoreWithReducers(rootReducer);

export const renderApp = (id: string = "root") => {
  const rootEl = document.getElementById(id);

  if (!rootEl) {
    return;
  }
  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <HeroProviderWrapper>
            <ReduxProvider store={store}>
              <PersistGate
                loading={<div>Loading...</div>}
                persistor={persistor}
              >
                <DarkModeProvider>
                  <RootRouterLoader />
                </DarkModeProvider>
              </PersistGate>
            </ReduxProvider>
          </HeroProviderWrapper>
        </BrowserRouter>
      </I18nextProvider>
    </StrictMode>,
  );
};
