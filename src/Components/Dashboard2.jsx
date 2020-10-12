import React, { useState, useEffect } from "react";
import fire from "../config/firebase";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import './Dashboard.css';
import Menu from "./Menu";

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

export default function Dashboard() {
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uid, setUid] = useState([]);

  const classes = useStyles();

  const db = fire.firestore();

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
    const dbs = fire.firestore();

    // dbs.enablePersistence().catch(function (err) {
    //   if (err.code === "failed-precondition") {

    //   } else if (err.code === "unimplemented") {

    //   }
    // });
    // dbs.settings({
    //   cacheSizeBytes: dbs.CACHE_SIZE_UNLIMITED,
    // });

    dbs.collection("products")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const id = querySnapshot.docs.map((doc) => doc.id);
        setProducts(data);
        setUid(id);
    });

    dbs.collection("category_product")
      .get()
      .then((querySnapshot) => {
        const datas = querySnapshot.docs.map((doc) => doc.data());
        setCategories(datas);
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
            <Grid key="product-counter" item xs={12} md={6} lg={6}>
              <div className="card-counter">
                <div className="container">
                  <p>Total Product:</p>
                  <h2>
                    <b>{products.length}</b>
                  </h2>
                </div>
              </div>
            </Grid>
            <Grid key="category-counter" item xs={12} md={6} lg={6}>
              <div className="card-counter">
                <div className="container">
                  <p>Total Category:</p>
                  <h2>
                    <b>{categories.length}</b>
                  </h2>
                </div>
              </div>
            </Grid>
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
                      <button className="update">
                        <Link to={`/edit-product/${uid[index]}`}>Update</Link>
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
