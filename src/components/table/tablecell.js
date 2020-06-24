import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, Button } from '@material-ui/core/';
import { green, red } from '@material-ui/core/colors';
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import EditIcon from '@material-ui/icons/Edit';

const TableCellComponent = ({ cellvalue, cellindex, type }) => {
  const getValue = (val) => {
    if (type === 'bool') {
      return cellvalue
        ? <CheckCircleOutlineIcon style={{ color: green[500] }} />
        : <BlockIcon style={{ color: red[500] }} />;
    }
    if (type === 'money') {
      return `$${Number(cellvalue).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    }
    if (type === 'edit') {
      return (
        <Button variant="contained" color="primary">
          <EditIcon />
        </Button>
      );
    }
    return val;
  };
  return (
    <TableCell align={cellindex > 0 ? 'right' : ''}>
      {getValue(cellvalue)}
    </TableCell>
  );
};

TableCellComponent.defaultProps = {
  type: 'string',
};

TableCellComponent.propTypes = {
  cellvalue: PropTypes.string.isRequired,
  cellindex: PropTypes.number.isRequired,
  type: PropTypes.string,
};

export default TableCellComponent;
