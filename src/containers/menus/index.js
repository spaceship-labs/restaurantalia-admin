import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadComponent from '../../components/head';
import TableComponent from '../../components/table';
import LoadingComponent from '../../components/loading';

class MenusContainerNoConnect extends Component {
  constructor(props) {
    super(props);
    // algo
    const { menusList, menusIds } = this.props;
    console.log('menus container', menusList, menusIds);
  }

  render() {
    const { menusList, loading } = this.props;
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
      <>
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
        <LoadingComponent open={loading} />
      </>
    );
  }
}

MenusContainerNoConnect.propTypes = {
  menusList: PropTypes.object.isRequired,
  menusIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { menusList, menusIds, loading } = state.menus;
  return { menusList, menusIds, loading };
};

const MenusContainer = connect(mapStateToProps)(MenusContainerNoConnect);

export { MenusContainerNoConnect };
export default MenusContainer;
