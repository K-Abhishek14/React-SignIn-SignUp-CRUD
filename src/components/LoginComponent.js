import React, { Component } from 'react';
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
 

class LoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      userpassword: '',
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  doLogin = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8090/home/validation', this.state)
      .then((res) => {
        if (res.data === 'Welcome User') {
          this.props.history.push("/dashboard");
        }
        else if (res.data === 'Authentication Fail') {
          console.log(res.data);
        }
      })
      .catch(error => { console.log(error) })
  }

  render() {
    const { classes } = this.props;
    const { username, userpassword } = this.state
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username" value={username} 
														onChange={this.changeHandler}
            autoFocus
            autoComplete = ""
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="userpassword" value={userpassword} onChange={this.changeHandler}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.doLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
    )
  }
}
export default LoginComponent = withStyles(styles, { withTheme: true })(LoginComponent)

// export default LoginComponent;
