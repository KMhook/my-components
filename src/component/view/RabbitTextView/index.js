import React, {PropTypes} from 'react';
import RabbitView from '../RabbitView';

require('./index.less');
class RabbitTextView extends RabbitView {
  constructor() {
    super();
  }

  render() {
    return (
      <div class="rabbit-textview">{props.text}</div>
    );
  }

}
RabbitView.displayName = 'RabbitTextView';
RabbitView.propTypes = {
  text: PropTypes.string.isRequired
};
RabbitView.defaultProps = {
  text: 'hello world'
};

export default RabbitView;
