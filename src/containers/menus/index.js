import React, { Component } from 'react';
import HeadComponent from '../../components/head';
import TableComponent from '../../components/table';

class MenusContainer extends Component {
  constructor(props) {
    super(props);
    // algo
    console.log('menus');
  }

  render() {
    return (
      <>
        <HeadComponent
          title="Menús"
          description="Listado de menús disponibles"
        />
        <TableComponent />
      </>
    );
  }
}

export default MenusContainer;
