import React from "react"

const Pizza = (props) => {
  return(
    <tr>
<td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      <td>{props.pizza.vegetarian ? "vegetarian" : "meaty"}</td>
      <td><button type="button" className="btn btn-primary"  onClick={()=> props.getPizza(props.pizza) } >Edit Pizza</button>  <button type="button" className="btn btn-danger" onClick={()=> props.delPizza(props.pizza) } >Delete</button></td>
    </tr>
  )
}

export default Pizza
