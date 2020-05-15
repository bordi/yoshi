import React from 'react';
import { BILoggerContext, IBILoggerContext } from './BILoggerContext';

interface IBILogger {
  children: (bi: IBILoggerContext) => any;
}

export class BILogger extends React.Component<IBILogger> {
  render() {
    return (
      <BILoggerContext.Consumer>
        {bi => this.props.children(bi)}
      </BILoggerContext.Consumer>
    );
  }
}
