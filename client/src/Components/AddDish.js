import React, { Component } from 'react';
import axios from 'axios';

export default class AddDish extends Component {
       state = {
       name: '', 
       description: '',
       ingredients: [],
           version: '',
           menu: 'LunchOnly'
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
   axios.post('http://localhost:3200/api/dish', this.state)
      .then(res => {
          console.log(res);
          console.log(res.data);
      })
}

render(){
    return(
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                     Dish Name:
                    <input type="text" name="name" defaultValue={this.state.name} value={this.state.name} onChange={this.handleChange} />
                </label>
                <label>
                     Description:
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                </label>
                <label>
                     Ingredience:
                    <input type="text" name="ingredience" value={this.state.ingredience} onChange={this.handleChange} />
                </label>
                <label>         
                    Menu version          
                        <select name="version" onChange={this.handleChange} value={this.state.version}>                
                            <option value="3/11">3/11</option>  
                            <option value="3/12">3/12</option>             
                            <option value="3/13">3/13</option>                 
                            <option value="3/14">3/14</option>               
                        </select>   
                </label>

                <button type="submit"> Add</button>
            </form>
        </div>
    )
}
}
