import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer, Table, TableHead, TableRow, TableBody, Paper, TablePagination,
} from '@material-ui/core/';
import TableCellComponent from './tablecell';

const elementsDefault = {
  1: {
    id: 1,
    nombre: 'Item #1',
    precio: '120.5',
    activo: true,
    padre: 'Im your father',
  },
};
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

const TableComponent = ({
  elements, columns, editButton, collection,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
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
            {Object.keys(elements)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((elkey) => {
                const el = elements[elkey];
                return (
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
                      cellvalue={`${collection}/editar/${el.id}`}
                      cellindex={columns.length}
                      type="edit"
                    />
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15, 30]}
        component="div"
        count={Object.keys(elements).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

TableComponent.defaultProps = {
  elements: elementsDefault,
  columns: columnsDefault,
  editButton: false,
  collection: '',
};

TableComponent.propTypes = {
  elements: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object),
  editButton: PropTypes.bool,
  collection: PropTypes.string,
};

export default TableComponent;
