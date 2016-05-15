import React from 'react';
import { connect } from 'react-redux';
import RabbitNodeView from '../views';


const mapStateToProps = () => {
  return {
    
  }
};

const mapDispatcherToProps = () => {
  return {}
};

class RabbitNodeContainer extends React.Component {
  componentDidMount() {

  }

  render() {
    return (<RabbitNodeView {...this.props}/>);
  }
}


export default connect(mapStateToProps, mapDispatcherToProps)(RabbitNodeContainer);
