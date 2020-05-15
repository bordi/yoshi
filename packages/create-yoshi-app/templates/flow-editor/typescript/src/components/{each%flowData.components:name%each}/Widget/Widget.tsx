import React from 'react';
import {
  ExperimentsProvider,
  withExperiments,
  InjectedExperimentsProps,
} from '@wix/wix-experiments-react';
import { ExperimentsBag } from '@wix/wix-experiments';
import { TPAComponentsProvider } from 'wix-ui-tpa/TPAComponentsConfig';
import { BILoggerProvider } from 'yoshi-flow-editor-runtime';
import { Button } from 'wix-ui-tpa/Button';
import webBiLogger from '@wix/web-bi-logger';
import initSchemaLogger from '../../../config/bi';
import styles from './Widget.st.css';

const biLogger = initSchemaLogger(webBiLogger);

export default class extends React.Component<{
  name: string;
  mobile: boolean;
  experiments: ExperimentsBag;
}> {
  render() {
    const { name, experiments, mobile } = this.props;

    return (
      <BILoggerProvider logger={biLogger}>
        <ExperimentsProvider options={{ experiments }}>
          <TPAComponentsProvider value={{ mobile }}>
            <Widget name={name} />
          </TPAComponentsProvider>
        </ExperimentsProvider>
      </BILoggerProvider>
    );
  }
}

export const Widget = withExperiments<
  { name: string } & InjectedExperimentsProps
>(({ name, ...rest }) => {
  return (
    <div {...styles('root', {}, rest)} data-hook="{%name%}-wrapper">
      <div className={styles.header}>
        <h2 data-hook="app-title">
          {'app.hello'} {name}!
        </h2>
      </div>
      <Button className={styles.mainButton}>click me</Button>
    </div>
  );
});
