import React, { Component } from 'react';
import axios from 'axios';

//this below is reservations:[] (plural)
export default class AddOrder extends Component {
       state = {
           order: []
       }


handleChange = event => {
    const value = event.target.value;
    this.setState({
        ...this.state,
        [event.target.name]: value
    });
    //this.setState({name: event.target.name, description: event.target.description});
}

handleSubmit = event => {
    //event.preventDefault();
  axios.post('http://localhost:3200/api/order', this.state)
      .then(res => {
          console.log(res);
          console.log(res.data);
      })
}


render(){
    return(   
        <div>
            <form onSubmit={this.handleSubmit}>
                <label><h4>ADD ORDER:</h4>
                     Orderer:
                    <input type="text" name="orderer" defaultValue={this.state.orderer} value={this.state.orderer} onChange={this.handleChange} />
                </label>
               <label>
                    Party Number:           
                     <select name="partyNumber" onChange={this.handleChange} value={this.state.partyNumber}>  
                     <option value="choose">--</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                    </select> 
                </label> 
                <label> Order Dish:
                    <select name="orderDish" onChange={this.handleChange} value={this.state.orderDish}> 
                        <option value="choose">--</option>
                       <option value="Poached Lobster">Poached Lobster</option>
                         <option value="Wild Scottish Sea Trout">Wild Scottish Sea Trout</option> 
                         <option value="White Quail">White Quail</option>       
                         <option value="Poached Apple Salad">Poached Apple Salad</option>  
                         <option value="Bread and Butter">Bread and Butter</option>
                         <option value="Royal Ossetra Caviar">Royal Ossetra Caviar</option> 
                     </select>   
                 </label> 
                    <label>
                     Instructions:
                        <input type="text" name="specialInstructions" value={this.state.specialInstructions} onChange={this.handleChange} />
                    </label>
                    <label>
                     Allergies:
                        <input type="text" name="allergies" value={this.state.allergies} onChange={this.handleChange} />
                    </label>
                <button type="submit">Place Order</button>
            </form>
        </div>
    )
}
}