import React from 'react';
import HeadComponent from './head';
import TableComponent from './table';
import MenusContainer from '../containers/menus';

const AllComponentsList = () => (
  <>
    <HeadComponent
      title="Home container"
      description="Lorem ipsum dolor sit amet"
    />
    <TableComponent title="algo" />
    <MenusContainer />
  </>
);

export default AllComponentsList;
