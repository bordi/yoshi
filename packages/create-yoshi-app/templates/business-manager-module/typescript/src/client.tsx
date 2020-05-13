import React, { FC, useMemo, useEffect } from 'react';
import {
  notifyViewStartLoading,
  TModuleParams,
} from '@wix/business-manager-api';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import { I18nextProvider, initI18n } from '@wix/wix-i18n-config';
import { COMPONENT_NAME } from './config';
import App from './components/App';

const AppContainer: FC<TModuleParams> = ({ locale = 'en' }) => {
  useEffect(() => {
    notifyViewStartLoading(COMPONENT_NAME);
  }, []);

  const i18n = useMemo(
    () =>
      initI18n({
        locale,
        asyncMessagesLoader: () =>
          import(`./assets/locale/messages_${locale}.json`),
      }),
    [locale],
  );

  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

export default AppContainer;
