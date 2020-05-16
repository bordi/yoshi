import React from 'react';
import { IWixStatic } from '@wix/native-components-infra/dist/src/types/wix-sdk';
import {
  I18nextProvider,
  translate,
  InjectedTranslateProps,
} from 'react-i18next';
import { iframeAppBiLoggerFactory } from '@wix/iframe-app-bi-logger';
import { get } from 'lodash';
import { WixSDK, BILogger, BILoggerProvider } from 'yoshi-flow-editor-runtime';
import { ColorPickerColorSpace, TextLabel } from '@wix/wix-base-ui';
// Replace this line with real schema initializer
import initSchemaLogger, { IExampleBILogger } from '../../../config/bi';
import i18n, { getLanguageWithInstance } from '../../../config/i18n';
import './Settings.global.scss';
import css from './Settings.scss';

const biLogger = initSchemaLogger(iframeAppBiLoggerFactory);

interface ISettingsProps {
  Wix: IWixStatic;
}

const defaultSettingsValues = {
  backgroundColor: '#ffffff',
  buttonBackgroundColor: '#ffffff',
  fontSize: 14,
};

const SettingsLabel = translate()(({ t }: InjectedTranslateProps) => (
  <TextLabel
    type="T02"
    value={t('app.settings.label')}
    shouldTranslate={false}
  />
));

export class Settings extends React.Component<ISettingsProps> {
  state = defaultSettingsValues;

  componentDidMount() {
    this.props.Wix.Styles.getStyleParams((styleParams: any) => {
      this.setState({
        backgroundColor: get(
          styleParams,
          'colors.backgroundColor.value',
          this.state.backgroundColor,
        ),
        buttonBackgroundColor: get(
          styleParams,
          'colors.buttonBackgroundColor.value',
          this.state.buttonBackgroundColor,
        ),
        fontSize: get(styleParams, 'fonts.fontSize.size', this.state.fontSize),
      });
    });
  }

  updateHeaderBackgroundColorWithBiLogger = (logger: IExampleBILogger) => (
    backgroundColor: string,
  ) => {
    logger.exampleBILog();
    this.props.Wix.Styles.setColorParam('backgroundColor', {
      value: { color: false, opacity: 1, rgba: backgroundColor },
    });
    this.setState({ backgroundColor });
  };
  render() {
    return (
      <div>
        <section className={css.section}>
          <SettingsLabel />
          <div className={css.colorPicker}>
            <BILogger>
              {(logger: IExampleBILogger) => (
                <ColorPickerColorSpace
                  onChange={this.updateHeaderBackgroundColorWithBiLogger(
                    logger,
                  )}
                  value={this.state.backgroundColor}
                />
              )}
            </BILogger>
          </div>
        </section>
      </div>
    );
  }
}

export default () => (
  <BILoggerProvider logger={biLogger}>
    <WixSDK isEditor>
      {({ Wix }) => (
        <I18nextProvider
          i18n={i18n({
            language: getLanguageWithInstance(Wix),
            waitForReact: true,
          })}
        >
          <Settings Wix={Wix} />
        </I18nextProvider>
      )}
    </WixSDK>
  </BILoggerProvider>
);
