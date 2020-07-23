import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../layout';
import HeadComponent from '../../components/head';
import TableComponent from '../../components/table';
import { mainDispatcher } from './dispatcher';
import selectors from './selectors';

class MenusContainerNoConnect extends Component {
  componentDidMount() {
    const { getMenus } = this.props;
    getMenus();
  }

  render() {
    const { menusList, menusIds } = this.props;
    console.log('menus container', menusList, menusIds);

    const attrsArray = [
      {
        attr: 'nombre',
        label: 'Nombre',
        type: 'string',
      },
      {
        attr: 'restauranteNombre',
        label: 'Restaurante',
        type: 'string',
      },
      {
        attr: 'activo',
        label: 'Activo',
        type: 'bool',
      },
      {
        attr: 'url',
        label: 'Ver menu',
        type: 'link',
      },
      {
        attr: 'qrUrl',
        label: 'Descarga QR',
        type: 'download',
      },
    ];
    return (
      <Layout>
        <HeadComponent
          title="Menús"
          description="Listado de menús disponibles"
        />
        <TableComponent
          elements={menusList}
          columns={attrsArray}
          collection="menus"
          editButton
        />
      </Layout>
    );
  }
}

MenusContainerNoConnect.propTypes = {
  menusList: PropTypes.object.isRequired,
  menusIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  getMenus: PropTypes.func.isRequired,
};

export default connect(selectors.propsSelector, mainDispatcher)(MenusContainerNoConnect);
