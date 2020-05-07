import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class PostUI extends Component {
  constructor(props) {
    super(props)

    this.initialState = {
      id: "",
      firstName: "",
      lastName: "",
      emailId: "",
    }
    if (props.user) {
      this.state = props.user
    } else {
      this.state = this.initialState;
    }
  }

  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit= (event) => {
    event.preventDefault();
    if (this.state.id) {
      this.props.updateEmployee(this.state);
    } else {
      this.props.createEmployee(this.state);
    }
  }

  render() {
    const { classes } = this.props;
    const { firstName, lastName, emailId } = this.state;
    let pageTitle;
    let buttonTitle;
    if (this.state.id) {
      pageTitle = <h2>Edit Employee Details</h2>
      buttonTitle = <h3>Edit Employee Details</h3>
    } else {
      pageTitle = <h2>Add Eployee Details</h2>
      buttonTitle = <h3>Add Eployee Details</h3>
    }
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">{pageTitle}</Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="Name"
                    value={firstName} onChange={this.changeHandler}
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName} onChange={this.changeHandler}
                    autoComplete="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="emailId"
                    label="Email ID"
                    name="emailId"
                    value={emailId}
                    onChange={this.changeHandler}
                    autoComplete="emailId"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
              >
                {buttonTitle}
          </Button>
            </form>
          </div>
        </Container>
      </div>
    )
  }
}

export default PostUI = withStyles(styles, { withTheme: true })(PostUI)

