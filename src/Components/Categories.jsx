import React, { useState, useEffect, useCallback } from "react";
import fire from "../config/firebase";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Menu from "./Menu";

import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import image from "../images/image.jpg";
import "./Dashboard.css";
// import { mainListItems, secondaryListItems } from "../Components/Menu";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ViewListIcon from "@material-ui/icons/ViewList";
import CategoryIcon from "@material-ui/icons/Category";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
  const [products, setProducts] = useState([]);
  const [uid, setUid] = useState([]);

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const logout = () => {
    fire.auth().signOut();
  };

  const classesCard = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 250,
    },
  });

  const db = fire.firestore();

  const editProduct = (id) => {
    const datas = {
      name: "Los Angeles 009 updated",
      category_id: 1,
      desc: "USA 009 updated",
      stock: 15,
    };

    db.collection("products")
      .doc(id)
      .set(datas)
      .then(() => {
        console.log("Product updated!");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const deleteProduct = (id) => {
    db.collection("products")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Product deleted!");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
    db.collection("products")
      //   .where("category_id", "==", 2)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const id = querySnapshot.docs.map((doc) => doc.id);
        console.log(data);
        console.log(id);
        setProducts(data);
        setUid(id);
      });
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Menu />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {products.map((product, index) => (
              <Grid key={index} item xs={12} md={6} lg={3}>
                <div className="card">
                  <img
                    className="img-cover"
                    src={product.img_link}
                    alt={product.name}
                    style={{ width: "100%" }}
                  />
                  <div className="container">
                    <h4>
                      <b>{product.name}</b>
                    </h4>
                    <p>{product.desc}</p>
                  </div>
                  <Grid container spacing={0}>
                    <Grid key={index} item xs={12} md={6} lg={6}>
                      <button
                        className="update"
                        onClick={() => {
                          editProduct(uid[index]);
                        }}
                      >
                        Update
                      </button>
                    </Grid>
                    <Grid key={index} item xs={12} md={6} lg={6}>
                      <button
                        className="delete"
                        onClick={() => {
                          deleteProduct(uid[index]);
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
