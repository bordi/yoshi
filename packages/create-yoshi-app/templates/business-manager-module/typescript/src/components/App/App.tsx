import React from 'react';
import { withTranslation, WithTranslation } from '@wix/wix-i18n-config';
import { notifyViewFinishedLoading } from '@wix/business-manager-api';
import { create } from '@wix/fedops-logger';
import { COMPONENT_NAME } from '../../config';
import s from './App.scss';

interface IAppProps extends WithTranslation {}

class App extends React.Component<IAppProps> {
  componentDidMount() {
    // Note: you might want to invoke notify after initial data fetch (to keep BM loader during fetch)
    const fedopsLogger = create(COMPONENT_NAME);
    fedopsLogger.appLoaded();
    notifyViewFinishedLoading(COMPONENT_NAME);
  }

  render() {
    const { t } = this.props;

    return (
      <div className={s.root}>
        <div className={s.header}>
          <h2 data-hook="app-title">{t('app.title')}</h2>
        </div>
        <p className={s.intro}>{t('app.intro')}</p>
      </div>
    );
  }
}

export default withTranslation()(App);
