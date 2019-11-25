import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card} from 'react-bootstrap';
import uuid from 'uuid/v4'

class App extends Component{
  constructor(){
    super();
    this.state={
      items: [
        {id:uuid(), task:"React", project:"Conometro"}
      ]
    }
  }
  render(){
    return(
    <Container>
        <h3>Hola</h3>
        <h5>Hola</h5>
    </Container>
    )
  }
}

export default App;
