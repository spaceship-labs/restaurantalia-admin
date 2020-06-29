import React from 'react';
import MenusContainer from '../containers/menus';
import CategoriesContainer from '../containers/categories';
import CreateCategoryContainer from '../containers/categories/create';
import DishesContainer from '../containers/dishes';
import CreateDishContainer from '../containers/dishes/create';

const AllComponentsList = () => (
  <>
    <CreateCategoryContainer />
    <CreateDishContainer />
    <MenusContainer />
    <CategoriesContainer />
    <DishesContainer />
  </>
);

export default AllComponentsList;
