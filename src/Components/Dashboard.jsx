import React, { Component } from "react";
import fire from "../config/firebase";

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            // setProduct: []
        }
    }
    logout() {
        fire.auth().signOut();
    }

    componentDidMount() {
        const db = fire.firestore();
        db.collection("products")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data);
                this.setState({ products: data });
            });
    }
    render() {

        const {products} = this.state;

        return (
            <div>
                <h1>You are logged in !!!</h1>

                <button onClick={this.logout}>Logout</button>
                <ul>
                    {products.map(product => (
                        <li key={product.name}>{product.name} - {product.desc}</li>
                    ))}
                </ul>
            </div>
        )
    }
}
export default Dashboard;