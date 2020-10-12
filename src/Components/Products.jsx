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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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
  const [products, setProducts] = useState([]);
  const [uid, setUid] = useState([]);

  const classes = useStyles();
  const [productName, setProductName] = useState('');
  const [imgLink, setImgLink] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [desc, setDesc] = useState('');
  // const [fresh, setFresh] = useState({});
  const [catProd, setCatProd] = useState([]);
  // const [catProdUid, setCatProdUid] = useState([]);

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

  const createProduct = () => {
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const uid = data.length;

        db.collection("products")
          .doc("inv-" + uid)
          .set({
            name: productName,
            img_link: imgLink,
            category: category,
            desc: desc,
            stock: stock,
          })
          .then(() => {
            console.log("Product Added!");
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      });
  };

  const db = fire.firestore();
  useEffect(() => {
  const db = fire.firestore();
    db.collection("products")
      //   .where("category_id", "==", 2)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const id = querySnapshot.docs.map((doc) => doc.id);
        setProducts(data);
        setUid(id);
      });

      db.collection("category_product")
        .get()
        .then((querySnapshot) => {
          const datas = querySnapshot.docs.map((doc) => doc.data());
          // const ids = querySnapshot.docs.map((doc) => doc.id);
          setCatProd(datas);
          // setCatProdUid(ids);
        });
  }, []);

  const handleProdName = ({ target: { value }}) => {
    setProductName(value);
  };
  const handleImgLink = ({ target: { value } }) => {
    setImgLink(value);
  };
  const handleCategory = ({ target: { value } }) => {
    setCategory(value);
  };
  const handleStock = ({ target: { value } }) => {
    setStock(value);
  };
  const handleDesc = ({ target: { value } }) => {
    setDesc(value);
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
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Product Name"
                        name="name"
                        type="text"
                        autoFocus
                        onChange={handleProdName}
                        // value={productName}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="img_link"
                        name="img_link"
                        label="Image Link"
                        type="text"
                        onChange={handleImgLink}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl
                        variant="outlined"
                        required
                        fullWidth
                        className={classes.formControl}
                      >
                        <InputLabel>Category</InputLabel>
                        <Select
                          id="category"
                          //   value={age}
                          onChange={handleCategory}
                          label="Category"
                        >
                          {catProd.map((cat, index) => (
                            <MenuItem value={cat.name}>{cat.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="stock"
                        name="stock"
                        label="Stock"
                        type="number"
                        onChange={handleStock}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="desc"
                    name="desc"
                    label="Product Description"
                    type="text"
                    onChange={handleDesc}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => createProduct()}
                  >
                    Create Product
                  </Button>
                </form>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <div className="card-add">
                <img
                  className="img-cover"
                  src={imgLink}
                  alt={productName}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </Grid>
          </Grid>
          <br></br>
          <hr></hr>
          <br></br>

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
                        // onClick={() => {
                        //   editProduct(uid[index]);
                        // }}
                      >
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
