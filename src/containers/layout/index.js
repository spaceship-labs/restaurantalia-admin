import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import HeaderComponent from '../../components/header';
import { Wrapper, Content } from '../../theme/layout.styled';
import SidebarComponent from '../../components/sidebar';
import LoadingComponent from '../../components/loading';

import selectors from './selectors';
import dispatcher from './dispatcher';

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
    const {
      children,
      userId,
      loading,
      alerts,
      dismissAlert,
    } = this.props;
    const hasAlerts = alerts.length > 0;
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
          <Collapse in={hasAlerts}>
            {alerts.map((it, ind) => {
              const { msg, id, type } = it;
              return (
                <Alert key={id} severity={type} onClose={() => dismissAlert({ ind, id })}>
                  {msg}
                </Alert>
              );
            })}
          </Collapse>
          <Container>{userId > 0 && children}</Container>
        </Content>
        <LoadingComponent open={loading} />
      </Wrapper>
    );
  }
}

LayoutUnconnect.propTypes = {
  children: PropTypes.node.isRequired,
  userId: PropTypes.number.isRequired,
  logout: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  dismissAlert: PropTypes.func.isRequired,
};

export { LayoutUnconnect };
const Layout = connect(selectors.propsSelector, dispatcher.mainDispatcher)(LayoutUnconnect);
export default Layout;
