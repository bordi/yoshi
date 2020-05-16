import LaboratoryTestkit from '@wix/wix-experiments/dist/src/laboratory-testkit';
import { ExperimentsBag } from '@wix/wix-experiments';
import { IWidgetControllerConfig } from '@wix/native-components-infra/dist/src/types/types';
import translations from '../../assets/locales/messages_en.json';
import { appName } from '../../../.application.json';
import { EXPERIMENTS_SCOPE } from '../../config/constants';
import getControllerConfigMock from '../../../__tests__/helpers/controllerConfig.mock';
import createAppController from './controller';

export function mockExperiments(scope: string, experiments: ExperimentsBag) {
  new LaboratoryTestkit()
    .withScope(scope)
    .withBaseUrl(window.location.href)
    .withExperiments(experiments)
    .start();
}

describe('createController', () => {
  it('should call setProps with data', async () => {
    mockExperiments(EXPERIMENTS_SCOPE, { someExperiment: 'true' });
    const setPropsSpy = jest.fn();
    const language = 'en';
    const experiments = { someExperiment: 'true' };
    const controllerConfig: IWidgetControllerConfig = getControllerConfigMock({
      setProps: setPropsSpy,
      appParams: {
        instance: '1',
        instanceId: '1',
        appDefinitionId: 'APP_DEF_ID',
        baseUrls: {
          staticsBaseUrl: 'http://some-static-url.com',
        },
      },
    });

    const controller = await createAppController({ controllerConfig });

    await controller.pageReady();

    expect(setPropsSpy).toBeCalledWith({
      appName,
      cssBaseUrl: controllerConfig.appParams.baseUrls.staticsBaseUrl,
      language,
      experiments,
      mobile: false,
      translations,
    });
  });
});
