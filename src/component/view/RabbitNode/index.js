import React from 'react';
//import Rect from '../../../util/shape/rect';
import RabbitNodeContainer from './containers';

require('./index.less');
class RabbitNode extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <RabbitNodeContainer {...this.props}/>
    );
  }
}
RabbitNode.displayName = 'RabbitNode';
RabbitNode.propTypes = {
};
RabbitNode.defaultProps = {
};

export default RabbitNode;
