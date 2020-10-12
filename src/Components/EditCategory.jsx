import React, { useState, useEffect } from "react";
import fire from "../config/firebase";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Menu from "./Menu";
import TextField from "@material-ui/core/TextField";

import { Link, useRouteMatch } from "react-router-dom";
import "./Dashboard.css";
import Button from "@material-ui/core/Button";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://teknonlogis.com/">
        Teknonlogis
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Products() {
  const [catProd, setCatProd] = useState([]);
  const [catProdUid, setCatProdUid] = useState([]);
  const [catName, setCatName] = useState([]);

  const classes = useStyles();
  const db = fire.firestore();

  const editCategory = (id) => {
    const data = {
      name: catName,
    };

    db.collection("category_product")
      .doc(id)
      .set(data)
      .then(() => {
        console.log("Product Category updated!");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const match = useRouteMatch("/edit-category/:categoryId");
  const catId = match.params.categoryId;
  useEffect(() => {
    db.collection("category_product")
      .doc(catId)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.data();
        setCatProd(data);
      });
  }, []);

  const handleCategory = ({ target: { value } }) => {
    setCatName(value);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Menu />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Edit Product
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="Category Name"
                    type="text"
                    onChange={handleCategory}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => editCategory(catId)}
                  >
                    Edit Category
                  </Button>
                </form>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <div className="card-cat-img">
                <img
                  className="img-cover"
                  // src={imgLink}
                  style={{ width: "100%", height: "100%" }}
                />
                <h4>{catProd.name}</h4>
              </div>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
