import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer, Table, TableHead, TableRow, TableBody, Paper,
} from '@material-ui/core/';
import TableCellComponent from './tablecell';

const elementsDefault = [
  {
    id: 1,
    nombre: 'Item #1',
    precio: '120.5',
    activo: true,
    padre: 'Im your father',
  },
  {
    id: 2,
    nombre: 'Item #2',
    precio: '151.5',
    activo: true,
    padre: 'Im your father',
  },
  {
    id: 3,
    nombre: 'Item #3',
    precio: '1220',
    activo: false,
    padre: 'Im your father',
  },
];
const columnsDefault = [
  {
    attr: 'nombre',
    label: 'Nombre',
    type: 'string',
  },
  {
    attr: 'precio',
    label: 'Precio',
    type: 'money',
  },
  {
    attr: 'activo',
    label: 'Activo',
    type: 'bool',
  },
  {
    attr: 'padre',
    label: 'Padre',
    type: 'string',
  },
];

const TableComponent = ({ elements, columns, editButton }) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          {columns.map((col, i) => (
            <TableCellComponent
              key={`table-head-${col.attr}`}
              cellvalue={col.label}
              cellindex={i}
            />
          ))}
          {editButton && <TableCellComponent cellvalue="Editar" cellindex={columns.length} />}
        </TableRow>
      </TableHead>
      <TableBody>
        {elements.map((el) => (
          <TableRow key={`table-row-${el.id}`}>
            {columns.map((col, i) => (
              <TableCellComponent
                key={`table-cell-${col.attr}`}
                cellvalue={el[col.attr]}
                cellindex={i}
                type={col.type}
              />
            ))}
            {editButton && (
            <TableCellComponent
              cellvalue="/edit/id"
              cellindex={columns.length}
              type="edit"
            />
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

TableComponent.defaultProps = {
  elements: elementsDefault,
  columns: columnsDefault,
  editButton: false,
};

TableComponent.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  editButton: PropTypes.bool,
};

export default TableComponent;
