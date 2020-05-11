import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider, initI18n } from '@wix/wix-i18n-config';
import { notifyViewStartLoading } from '@wix/business-manager-api';
import { COMPONENT_NAME } from './config';
import App from './components/App';

const useOnce = cb => {
  const ref = useRef(false);

  if (!ref.current) {
    ref.current = true;
    cb();
  }
};

const AppContainer = ({ locale = 'en' }) => {
  useOnce(() => notifyViewStartLoading(COMPONENT_NAME));

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

AppContainer.propTypese = {
  locale: PropTypes.string,
  config: PropTypes.object,
};

export default AppContainer;
