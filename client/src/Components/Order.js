import React, {Component} from 'react';

class Order extends Component {
    constructor() {
        super();
        this.state = {
            order: [],
        }
    }
  
    async componentDidMount(){
                     
        const url = "http://localhost:3200/api/order";
        console.log(url);
        const response = await fetch(url);
        console.log('response - ',response);
        const data = await response.json();
        console.log('data - ',data);
        this.setState({ order: data }, () => console.log('Orders fetched...', data));
    }

    render(){
        return (<div>
               <h3>ORDERS:</h3> 
                {this.state.order.map(order => <li key = {order.id}>
                   {order.orderer},{order.partyNumber}, {order.orderDish},{order.specialInstructions},{order.allergies}</li>
              )}
               </div>
            )
       
        }
}

export default Order;