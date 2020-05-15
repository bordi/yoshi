import React from 'react';
import { BILoggerContext, IBILoggerContext } from './BILoggerContext';

interface IBILoggerProvider {
  logger: IBILoggerContext;
  children: any;
}

export class BILoggerProvider extends React.Component<IBILoggerProvider> {
  render() {
    return (
      <BILoggerContext.Provider value={this.props.logger}>
        {this.props.children}
      </BILoggerContext.Provider>
    );
  }
}
