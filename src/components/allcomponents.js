import React from 'react';
import HeadComponent from './head';
import TableComponent from './table';

const AllComponentsList = () => (
  <>
    <HeadComponent
      title="Home container"
      description="Lorem ipsum dolor sit amet"
    />
    <TableComponent title="algo" />
  </>
);

export default AllComponentsList;
