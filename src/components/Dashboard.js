import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';
import GetUI from './GetUI';
import PostUI from './PostUI';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'

const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  AddIcon: {
    float: 'right',
  }
});

export class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      getOperation: true,
      postOperation: false,
      editOperation: false,
      user: {},
    }
  }

  createEmployee = (data) => {
    axios
      .post('http://localhost:8080/api/v1/employees', data)
      .then((res) => {
        if (res.data) {
          window.location.reload(false);
          console.log("New Employee Data Created Sucessfully")
        }
      })
      .catch(error => { console.log(error) })
  }

  editUser = (id) => {
    axios.get(`http://localhost:8080/api/v1/employees/${id}`)
      .then((res) => {
        console.log("Edit List", res.data);
        let data = {
          id: res.data.id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          emailId: res.data.emailId,
        }
        this.setState({
          user: data,
          getOperation: false,
          postOperation: false,
          editOperation: true,
        });
      })
  }

  updateEmployee = (data) => {
    axios.put(`http://localhost:8080/api/v1/employees/${data.id}`,data)
      .then((res) => {
        console.log("Edit List", res.data);
        this.setState({
          user: data,
          getOperation: true,
          postOperation: false,
          editOperation: false,
        });
      })
  }

  getButttonClick = () => {
    this.setState({ getOperation: true, postOperation: false })
  }
  postButtonClick = () => {
    this.setState({ postOperation: true, getOperation: false })
  }
  render() {
    const { classes } = this.props;
    const { getOperation, postOperation, editOperation } = this.state

    let userForm;
    if (postOperation) {
      console.log("in if", postOperation, editOperation);
      userForm = <PostUI createEmployee={this.createEmployee} />
    }
    else if (editOperation) {
      console.log("in else", postOperation, editOperation);
      userForm = <PostUI updateEmployee={this.updateEmployee} user={this.state.user} />
    }
    return (
      <div>
        <Header history={this.props.history} key="1" />
        <div className={classes.root}>
          {getOperation && <GetUI editUser={this.editUser} />}
          {userForm}
          
          <Fab color="primary" aria-label="add" className={classes.AddIcon} onClick={this.postButtonClick}>
            <AddIcon />
          </Fab>
          
        </div>
      </div>
    )
  }
}
export default Dashboard = withStyles(styles, { withTheme: true })(Dashboard)

