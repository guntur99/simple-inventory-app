import React, { Component } from "react";
import fire from "../config/firebase";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: "",
    };
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const classes = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} style={{ marginTop: "100px" }}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
              value={this.state.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "15px" }}
              className={classes.submit}
              onClick={this.signup}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item style={{ marginTop: "15px" }}>
                <Link variant="body2" to={`/login`}>
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
export default SignUp;
