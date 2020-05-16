import Experiments from '@wix/wix-experiments';
import { EXPERIMENTS_SCOPE } from '../../config/constants';
import { id as widgetId } from './.component.json';

export interface ControllerConfig {
  appParams: any;
  setProps: Function;
  wixCodeApi: any;
}

export interface ControllerContext {
  frameworkData?: any;
  appData?: Promise<any>;
  widgetConfig?: any;
  controllerConfig: ControllerConfig;
  fedopsLogger: any;
}

function getSiteLanguage({ wixCodeApi }: ControllerConfig) {
  if (wixCodeApi.window.multilingual.isEnabled) {
    return wixCodeApi.window.multilingual.currentLanguage;
  }

  // NOTE: language can be null (see WEED-18001)
  return wixCodeApi.site.language || 'en';
}

function isMobile({ wixCodeApi }: ControllerConfig) {
  return wixCodeApi.window.formFactor === 'Mobile';
}

function isSSR({ wixCodeApi }: ControllerConfig): boolean {
  return wixCodeApi.window.rendering.env === 'backend';
}

async function getExperimentsByScope(scope: string) {
  const experiments = new Experiments({
    scope,
  });
  await experiments.ready();
  return experiments.all();
}

async function createController({
  controllerConfig,
  fedopsLogger,
}: ControllerContext) {
  const { appParams, setProps } = controllerConfig;
  const language = getSiteLanguage(controllerConfig);
  const mobile = isMobile(controllerConfig);
  const experiments = await getExperimentsByScope(EXPERIMENTS_SCOPE);
  const { baseUrls = {} } = appParams;

  fedopsLogger.appLoadStarted();

  return {
    async pageReady() {
      setProps({
        name: 'World',
        cssBaseUrl: baseUrls.staticsBaseUrl,
        language,
        mobile,
        experiments,
      });

      // report loaded SSR of widget
      if (isSSR(controllerConfig)) {
        fedopsLogger({ appId: appParams.appDefinitionId, widgetId });
      }
    },
  };
}

export default createController;
