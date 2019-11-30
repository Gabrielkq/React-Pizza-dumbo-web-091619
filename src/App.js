import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  
  state = {
    pizzas: [],
    pizzaToEdit: null,
    topping: "Enter Pizza Topping",
    size: null,
    vegetarian: false
  }

  submitPizza = (pizza) => {
    if(!pizza){
      fetch(`http://localhost:3000/pizzas/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          topping: this.state.topping,
          size: this.state.size,
          vegetarian: this.state.vegetarian
        })
      }).then(r => r.json())
      .then( updatedPizza => {
        this.setState({
          pizzas: [...this.state.pizzas, updatedPizza],
          pizzaToEdit: null,
          topping: "Enter Pizza Topping",
          size: null,
          vegetarian: false
        })
      })
    }else{
      fetch(`http://localhost:3000/pizzas/${pizza.id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          topping: this.state.topping,
          size: this.state.size,
          vegetarian: this.state.vegetarian
        })
      }).then(r => r.json())
      .then( updatedPizza => {
        this.setState({
          pizzas: this.state.pizzas.map(pizza => pizza.id === updatedPizza.id ? updatedPizza : pizza),
          pizzaToEdit: null,
          topping: "Enter Pizza Topping",
          size: null,
          vegetarian: false
        })
      })}
     
    }

  delPizza = (pizzaToDel) => {
    fetch(`http://localhost:3000/pizzas/${pizzaToDel.id}`,{
        method: 'DELETE'})
        .then(r => r.json())
        .then(delPizza => {
          let delPizzaArr = this.state.pizzas.filter(pizza => pizza.id !== pizzaToDel.id)
          this.setState({
            pizzas: delPizzaArr,
            pizzaToEdit: null
          })
        })
  }

  componentDidMount(){
    fetch(`http://localhost:3000/pizzas`)
    .then(r => r.json())
    .then(data => {
      this.setState({
        pizzas: data
      })
    })
  }
  
  changeVegetarian = (value) => {
    this.setState({
      vegetarian: value
    })
  }

  changeTopping = (value) => {
    this.setState({
      topping: value
    })
  }

  changeSize = (value) => {
    this.setState({
      size: value
    })
  }

  editPizza = (pizzaObj) => {
    this.setState({
      pizzaToEdit: pizzaObj,
      topping: pizzaObj.topping,
      size: pizzaObj.size,
      vegetarian: pizzaObj.vegetarian
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.pizzaToEdit}submitPizza={this.submitPizza}changeVegetarian={this.changeVegetarian} changeTopping={this.changeTopping} changeSize={this.changeSize} topping={this.state.topping} size={this.state.size} vegetarian={this.state.vegetarian} />
        <PizzaList delPizza={this.delPizza} pizzas={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
