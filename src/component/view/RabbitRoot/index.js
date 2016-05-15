import RabbitNode from '../RabbitNode';
import * as RabbitRootActions from  './actions';

require('./index.less');
class RabbitRoot extends RabbitNode {
  constructor() {
    super();
  }

  render() {
    return (
      <RabbitRootView />
    );
  }

}
RabbitRoot.displayName = 'RabbitRootView';
RabbitRoot.propTypes = {

};
RabbitRoot.defaultProps = {

};

export default RabbitRoot;
