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

import { Link } from "react-router-dom";
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

  const createCategory = () => {
    db.collection("category_product")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const uid = data.length;

        db.collection("category_product")
          .doc("cat-"+uid)
          .set({
            name: catName,
          })
          .then(() => {
            console.log("Category Added!");
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      });
  };

  const deleteCategory = (id) => {
    db.collection("category_product")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Product Category deleted!");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
  const dbs = fire.firestore();
    dbs.enablePersistence().catch(function (err) {
      if (err.code === "failed-precondition") {
      } else if (err.code === "unimplemented") {
      }
    });

    dbs.collection("category_product")
      .get()
      .then((querySnapshot) => {
        const datas = querySnapshot.docs.map((doc) => doc.data());
        const ids = querySnapshot.docs.map((doc) => doc.id);
        setCatProd(datas);
        setCatProdUid(ids);
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
                  Create New Product
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
                    onClick={() => createCategory()}
                  >
                    Create Category
                  </Button>
                </form>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <div className="card-cat-img">
                <img
                  className="img-cover"
                  // src={imgLink}
                  alt="L cover"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </Grid>
          </Grid>
          <br></br>
          <hr></hr>
          <br></br>
          <Grid container spacing={3}>
            {catProd.map((category, index) => (
              <Grid key={index} item xs={12} md={6} lg={3}>
                <div className="card-cat-prod">
                  <div className="container">
                    <h4>
                      <b>{category.name}</b>
                    </h4>
                  </div>
                  <Grid container spacing={0}>
                    <Grid key={index} item xs={12} md={6} lg={6}>
                      <button
                        className="update"
                        // onClick={() => {
                        //   editCategory(catProdUid[index]);
                        // }}
                      >
                        <Link to={`/edit-category/${catProdUid[index]}`}>Update</Link>
                      </button>
                    </Grid>
                    <Grid key={index} item xs={12} md={6} lg={6}>
                      <button
                        className="delete"
                        onClick={() => {
                          deleteCategory(catProdUid[index]);
                        }}
                      >
                        Delete
                      </button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            ))}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
