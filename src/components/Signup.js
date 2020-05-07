import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'

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

 class Signup extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
      name : "",
      email : "",
      username : "",
      userpassword : "",
     }
   }
   
   changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  doSignup = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:9090/register', this.state)
      .then((res) => {
        if (res.data === `Hi ${this.state.name} your Registration process successfully completed`) {
          this.props.history.push("/login");
        }
        else if (res.data === 'Authentication Fail') {
          console.log(res.data);
        }
      })
      .catch(error => { console.log(error) })
  }


  render() {
    const { classes } = this.props;
    const {name,email,username, userpassword } = this.state
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                value={name} onChange={this.changeHandler}
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email} onChange={this.changeHandler}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="UserName"
                label="UserName"
                name="username"
                value={username} 
								onChange={this.changeHandler}
                autoComplete="UserName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="userpassword"
                label="Password"
                type="password"
                value={userpassword} 
                onChange={this.changeHandler}
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.doSignup}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
       
    </Container>
    )
  }
}
export default Signup = withStyles(styles, { withTheme: true })(Signup)
// export default Signup
