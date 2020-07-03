import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, Button, Link } from '@material-ui/core/';
import { green, red } from '@material-ui/core/colors';
import BlockIcon from '@material-ui/icons/Block';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import LinkIcon from '@material-ui/icons/Link';

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
        <Button href={cellvalue} variant="contained" color="primary">
          <EditIcon />
        </Button>
      );
    }
    if (type === 'link') {
      return (
        <Link
          href={cellvalue}
          target="_blank"
          aria-label="Ver sitio"
          rel="noopener noreferrer"
        >
          <LinkIcon />
        </Link>
      );
    }
    if (type === 'download') {
      return (
        <a
          href={cellvalue}
          target="_blank"
          download="CodigoQr.png"
          aria-label="Download"
          rel="noopener noreferrer"
        >
          <GetAppIcon />
        </a>
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
  // eslint-disable-next-line react/forbid-prop-types
  cellvalue: PropTypes.any.isRequired,
  cellindex: PropTypes.number.isRequired,
  type: PropTypes.string,
};

export default TableCellComponent;
