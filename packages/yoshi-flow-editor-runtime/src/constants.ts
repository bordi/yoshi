export const DEFAULT_WIX_SDK_SRC =
  'https://static.parastorage.com/services/js-sdk/1.469.0/js/wix-private.min.js';

export const OOI_WIDGET_COMPONENT_TYPE = 'WIDGET_OUT_OF_IFRAME';
export const PLATFORM_WIDGET_COMPONENT_TYPE = 'STUDIO_WIDGET';
export const PAGE_COMPONENT_TYPE = 'PAGE_OUT_OF_IFRAME';

export interface ExperimentsConfig {
  scope: string;
}

export type WidgetType =
  | typeof OOI_WIDGET_COMPONENT_TYPE
  | typeof PLATFORM_WIDGET_COMPONENT_TYPE
  | typeof PAGE_COMPONENT_TYPE;

export type SentryConfig = {
  teamName: string;
  projectName: string;
  DSN: string;
  id: string;
};
