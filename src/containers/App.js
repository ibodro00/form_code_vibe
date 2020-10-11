import React, { Component } from 'react';
import classes from './App.module.css';
import Input from '../components/Input/Input';

class App extends Component {
  stateConfig = (elementType, type, placeholder, value) => {
      let object = null;
      object = 
      {
          elementType:elementType,
          elementProps:{
          type:type,
          placeholder:placeholder
      },
        value:value
    }
      return object;
  }
  state={
    inputs:{
      name:this.stateConfig('input', 'text', 'Your name', ''),
      lastname:this.stateConfig('input', 'text', 'Your lastname', ''),
      address:this.stateConfig('input', 'text', 'Your adress', ''),
      phone:this.stateConfig('input', 'tel', 'Phone number', ''),
      email:this.stateConfig('input', 'email', 'Your email', ''),
      checkbox:this.stateConfig('input', 'checkbox', '', '')
    }
  }

  changeHandler = (event) => {
    console.log(event.target.value);
  }
  
render(){
  const array = [];
  let form_elements = null;
  for (let key in this.state.inputs)
  {
    array.push({
      id:key,
      elements:this.state.inputs[key]
    })
  }
  form_elements=(
    array.map((form_element) => {
      return <Input
      key={form_element.id}
      elementtype = {form_element.elements.elementType}
      propstype = {form_element.elements.elementProps.type}
      placeholder = {form_element.elements.elementProps.placeholder}
      value = {form_element.value}
      changed = {(event) => this.changeHandler(event)}
      />
    })
  )
    return (
      <div className={classes.App}>
        <h1 className={classes.H1}>Please, enter your data</h1>
        <form className={classes.Form}>
          {form_elements}
          <button className={classes.Button}>Submit</button>
        </form>
        
      </div>
    );
  }
}

export default App;
