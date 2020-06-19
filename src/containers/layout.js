import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import authActions from '../actions/auth';

import HeaderComponent from '../components/header';
import { Wrapper, Content } from '../theme/layout.styled';
import SidebarComponent from '../components/sidebar';

class LayoutUnconnect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarToggle: true,
      width: 0,
    };

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { userId, getUser } = this.props;
    if (userId === 0) {
      getUser();
    }
    window.addEventListener('resize', this.handleResize);
  }

  handleToggleSidebar() {
    const { sidebarToggle } = this.state;
    const newToggle = !sidebarToggle;
    this.setState({ sidebarToggle: newToggle });
  }

  handleResize() {
    const newWidth = window.innerWidth;
    const { width } = this.state;
    if (width) this.setState({ width: newWidth });
  }

  logout() {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { sidebarToggle } = this.state;
    const { children, userId } = this.props;
    return (
      <Wrapper>
        <HeaderComponent
          userId={userId}
          sidebarToggle={sidebarToggle}
          handleToggleSidebar={this.handleToggleSidebar}
          logout={this.logout}
        />
        <SidebarComponent
          sidebarToggle={sidebarToggle}
          handleToggleSidebar={this.handleToggleSidebar}
        />
        <Content>
          {children}
        </Content>
      </Wrapper>
    );
  }
}

LayoutUnconnect.propTypes = {
  children: PropTypes.node.isRequired,
  userId: PropTypes.number.isRequired,
  getUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { userId } = state.auth;
  return {
    userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { getUser, logout } = authActions.creators;
  return bindActionCreators(
    {
      getUser,
      logout,
    },
    dispatch,
  );
};

export { LayoutUnconnect };
const Layout = connect(mapStateToProps, mapDispatchToProps)(LayoutUnconnect);
export default Layout;
