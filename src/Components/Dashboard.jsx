import React, { Component } from "react";
import fire from "../config/firebase";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      uid: ''
    };
  }

  logout() {
    fire.auth().signOut();
  }

  createProduct() {
    const db = fire.firestore();

    db.collection("products")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const uid = data.length;

        db.collection("products")
          .doc("inv-" + uid)
          .set({
            name: "Los Angeles 5",
            category_id: 1,
            desc: "USA 2",
            stock: 15,
          })
          .then(() => {
            console.log("Product Added!");
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      });
    
  }

  editProduct(id) {
    const db = fire.firestore();

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
  }

  deleteProduct(id) {
    const db = fire.firestore();

    db.collection("products")
        .doc(id)
        .delete()
        .then(() => {
            console.log("Product deleted!");
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
  }

  componentDidMount() {
    const db = fire.firestore();

    db.collection("products")
    //   .where("category_id", "==", 2)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const id = querySnapshot.docs.map((doc) => doc.id);
        console.log(data);
        this.setState({ products: data, uid: id });
      });
  }
  render() {
    const { products } = this.state;

    const classes = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    }));

    const classesCard = makeStyles({
      root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      }
    });

    return (
      <>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Photos
              </Typography>
              {/* {auth && ( */}
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  {/* <AccountCircle onClick={this.createProduct} /> */}

                  <PlaylistAddIcon  onClick={this.createProduct} />
                </IconButton>
              </div>
              <Button color="inherit" onClick={this.logout}>
                Log Out
              </Button>
              {/* )} */}
            </Toolbar>
          </AppBar>
        </div>

        <div className={classes.root} style={{ marginTop: "15px" }}>
          <Grid container spacing={3}>
            {products.map((product, index) => (
              <Grid key={product.name} item xs>
                <Card className={classesCard.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classesCard.media}
                      title={product.name}
                      src="https://sanjoaquinmagazine.com/wp-content/uploads/2018/02/shutterstock_690857098.jpg"
                    />
                    {/* <img
                      alt="Social Account"
                      height="140px"
                      src="https://sanjoaquinmagazine.com/wp-content/uploads/2018/02/shutterstock_690857098.jpg"
                      width="auto"
                    /> */}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {product.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        this.editProduct(this.state.uid[index]);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        this.deleteProduct(this.state.uid[index]);
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </>
    );
  }
}
export default Dashboard;