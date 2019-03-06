import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ACCESS_TOKEN } from '../../constants';

class LogoutPage extends Component {
  constructor(props)
  {
    super(props);

  }


  componentDidMount() {
this.props.onLogout();
  }

  render() {
    return null
  }
}


export default LogoutPage
