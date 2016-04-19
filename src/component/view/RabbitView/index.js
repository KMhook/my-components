import React from 'react';

require('./index.less');
class RabbitView extends React.Component {
  constructor() {
  super();
}

  render() {
  return (
    <div class="rabbit-view"></div>
  );
}

}
RabbitView.displayName = 'RabbitView';
RabbitView.propTypes = {

};
RabbitView.defaultProps = {

};

export default RabbitView;
