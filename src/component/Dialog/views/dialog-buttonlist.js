import React from 'react';

import RabbitNode from '../RabbitNode';
import RabbitRootContainer from './containers';

require('./index.less');
class RabbitRoot extends RabbitNode {
  constructor() {
    super();
  }

  render() {
    return (
      <RabbitRootContainer />
    );
  }
}

RabbitRoot.displayName = 'RabbitRoot';

RabbitRoot.propTypes = {

};

RabbitRoot.defaultProps = {

};

export default RabbitRoot;
