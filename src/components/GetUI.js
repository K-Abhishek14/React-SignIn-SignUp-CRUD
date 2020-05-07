import React, { Component } from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
 

const styles = theme => ({
  root: {
    display: 'block',
  },
  tableCell: {
    border: '1px solid grey',
    textAlign: 'center'
  }
});

const tableHeaderData = [
  { id: 1, header: "Emp_ID" },
  { id: 2, header: "First Name" },
  { id: 3, header: "Last Name" },
  { id: 4, header: "Email ID" },
  { id: 4, header: "Edit" },
  { id: 4, header: "Delete" },
]

class GetUI extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      rowsPerPage: 5,
      emp: [],
    }
  }

  componentDidMount() {
    this.getEmployee();
  }
  getEmployee = () => {
    axios.get('http://localhost:8080/api/v1/employees')
      .then(res => {
        console.log(res.data)
        this.setState({ emp: res.data });
      })
  }

  deleteEmployee = (id) => {
    axios.delete(`http://localhost:8080/api/v1/employees/${id}`)
      .then(res => {
        window.location.reload(false);
      })
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage })
  }
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: +event.target.value, page: 0 })
  }

  render() {
    const { classes } = this.props;
    const { emp, page, rowsPerPage,} = this.state
    console.log("object", emp);
    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead style={{ backgroundColor: 'lightseagreen', textAlign: 'center' }}>
            <TableRow >
              {tableHeaderData !== undefined && tableHeaderData.length && tableHeaderData.map(item => (
                <TableCell key={item.id} className={classes.tableCell}>{item.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {emp !== undefined && emp.length && emp.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
              <TableRow key={item.id}>
                <TableCell className={classes.tableCell}>{item.id}</TableCell>
                <TableCell className={classes.tableCell}>{item.firstName}</TableCell>
                <TableCell className={classes.tableCell}>{item.lastName}</TableCell>
                <TableCell className={classes.tableCell}>{item.emailId}</TableCell>
                <TableCell className={classes.tableCell}>
                  <EditIcon color="primary" onClick={() => this.props.editUser(item.id)} /></TableCell>
                <TableCell className={classes.tableCell}>
                  <DeleteIcon color="secondary" onClick={() => this.deleteEmployee(item.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[2, 5, 8, 10, 15, 40, 50, 100, 150, 200, 250, 300, 350, 400, 500]}
          component="div"
          count={emp.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}
export default GetUI = withStyles(styles, { withTheme: true })(GetUI)



