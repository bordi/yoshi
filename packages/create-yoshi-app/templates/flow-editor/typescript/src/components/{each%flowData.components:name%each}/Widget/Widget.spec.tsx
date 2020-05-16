import React from 'react';
import { render } from '@testing-library/react';
import { ExperimentsProvider } from '@wix/wix-experiments-react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../../__tests__/helpers/i18n.mock';
import { Widget } from './Widget';

describe('Widget', () => {
  it('should render a title correctly', async () => {
    const appName = 'My App';

    const { getByTestId } = render(
      <ExperimentsProvider options={{ experiments: {} }}>
        <I18nextProvider i18n={i18n}>
          <Widget appName={appName} />
        </I18nextProvider>
      </ExperimentsProvider>,
    );

    const key = 'app.widget.welcome';

    expect(getByTestId('app-title').textContent).toBe(`${key} ${appName}!`);
  });
});
