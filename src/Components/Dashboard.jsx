import React, { Component } from "react";
import fire from "../config/firebase";

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

    return (
      <div>
        <h1>You are logged in !!!</h1>

        <button onClick={this.logout}>Logout</button>
        <button onClick={this.createProduct}>Create New Product</button>
        <ul>
          {products.map((product, index) => (
            <li key={product.name}>
                {product.name} - {product.desc} - {product.id} |
                <button onClick={()=> {this.editProduct(this.state.uid[index]);}}>Update Product</button> | 
                <button onClick={()=> {this.deleteProduct(this.state.uid[index])}}>Delete Product</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Dashboard;