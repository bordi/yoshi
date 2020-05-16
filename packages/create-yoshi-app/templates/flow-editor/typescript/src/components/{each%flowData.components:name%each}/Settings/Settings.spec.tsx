import React from 'react';
import { render } from '@testing-library/react';
import { IWixStatic } from '@wix/native-components-infra/dist/src/types/wix-sdk';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../../__tests__/helpers/i18n.mock';
import { Settings } from './Settings';

jest.mock('@wix/wix-base-ui', () => ({
  ...jest.requireActual('@wix/wix-base-ui'),
  ColorPickerColorSpace: () => <div data-hook="base-ui-color-picker" />,
}));

describe('Settings', () => {
  const styleParams = {
    colors: {
      backgroundColor: {
        value: '#F8EE28',
      },
    },
    fonts: {
      fontSize: {
        size: 16,
      },
    },
  };

  const Wix: IWixStatic = {
    // @ts-ignore we're only partially mocking Wix object
    Styles: {
      getStyleParams: (callback: Function) => callback(styleParams),
      setColorParam: () => {},
    },
  };

  it('should render a color picker component', () => {
    const { getAllByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <Settings Wix={Wix} />
      </I18nextProvider>,
    );
    expect(getAllByTestId('base-ui-color-picker')).not.toBeNull();
  });
});
