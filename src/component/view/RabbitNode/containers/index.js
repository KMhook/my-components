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
    /*eslint-disable no-console*/
    console.log('hello' + this.props.role);
    /*eslint-enable no-console*/
  }

  render() {
    return (<RabbitNodeView {...this.props}/>);
  }
}


export default connect(mapStateToProps, mapDispatcherToProps)(RabbitNodeContainer);
