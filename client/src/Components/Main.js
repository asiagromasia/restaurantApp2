import React, {Component} from 'react';
import Title from './Title';
import Reservation from './Reservation';
import AddReservation from './AddReservation';
import Table from './Table';
import AddsTables from './AddsTables';
import Dish from './Dish';
import AddDish from './AddDish';
import UpdateMenuItem from './UpdateMenuItem' 

class Main extends Component {   
    render(){      
        return( <div>  
                   <Title/> 
                  <br/>
                  <Table/>
                  <AddsTables/>
                  <Dish/>
                  <AddDish/>
                 
                  <Reservation/>
                  <AddReservation/>
               
                </div>      
              )   //before in div was<DishList/> <Dish/><AddDish/>
             // <UpdateMenuItem/>
    }
}
export default Main;
