import React from 'react';

const RABBIT_PREFIX = 'rabbit-';
const RabbitNodeView = (props) => (
  <div role={props.role} className={RABBIT_PREFIX + props.role}>
    {props.children}
  </div>
);

RabbitNodeView.propTypes = {
  role: React.PropTypes.string,
  children: React.PropTypes.array || React.PropTypes.object
};
RabbitNodeView.defaultProps = {
  role: 'node'
};
export default RabbitNodeView;
