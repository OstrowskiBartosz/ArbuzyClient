import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  [`&.${tableCellClasses.body}`]: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:hover': {
    backgroundColor: 'rgb(218, 223, 225)'
  }
}));

const tableCellStyle = {
  fontWeight: 'bold',
  color: 'White',
  backgroundColor: 'rgba(0, 123, 255, 1)'
};

const statusColors = {
  Pending: { color: '#f0ad4e' },
  Completed: { color: '#5cb85c' },
  Cancelled: { color: '#d9534f' }
};

export { StyledTableCell, StyledTableRow, tableCellStyle, statusColors };
