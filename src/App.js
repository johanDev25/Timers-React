import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form} from 'react-bootstrap';
import uuid from 'uuid/v4'

class App extends Component{
  constructor(){
    super();
    this.state={
      items: [
        {id:uuid(), task:"React", project:"Conometro", time: 0, optn:'start', update:false, newItem:false}
      ],
      task: '',
      project: ''
    }
  }

  updateItem = (index) =>{
    this.setState({
      items: this.state.items.map((item,i) => {
        if (index === i){
          item.update = true
        }
        return item
      })
    });
  }

  noUpdateItem = (index) =>{
    this.setState({
      items: this.state.items.map((item,i) => {
        if (index === i){
          item.update = false
        }
        return item
      })
    });
  }

  onInputChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _add = (e) =>{
    e.preventDefault()
    let { items } = this.state;
    let newItems = [
      ...items,
      { id:uuid(),
        task:'',
        project:'',
        time: 0,
        count: 0,
        optn:"start",
        update:true,
        newItem:true}
      ]
      this.setState({ items : newItems });
    }

    _save = (i) =>{
      this.setState({
        items: this.state.items.map((item) =>
        i.id === item.id ? {
          id: item.id,
          task:this.state.task,
          project:this.state.project,
          time: item.time,
          count: item.count,
          optn:item.optn,
          update: false,
          newItem:false} : item
        )
      });
    }

    _remove = (position) =>{
      let { items } = this.state;

      let newItems = [
        ...items.slice(0, position),
        ...items.slice(position + 1),
      ]

      this.setState({ items : newItems });

    }

    getSeconds = (s) => {
      return  Math.floor(s % 60);
    }

    getMinutes = (s) =>{
      return  Math.floor(s / 60) % 60;
    }

    getHour = (s) =>{
      return Math.floor(s / 60 / 60);
    }

    handleClickStart = (i, index) =>{
      this.toggle(index)
      const count = setInterval(() => {
        this.setState({
          items: this.state.items.map((item,ind) => {
            if (i.id === item.id){
              item.time = item.time + 1
              item.count = count
            }
            return item
          })
        });
      }, 1000)
    }

    handleClickStop = (i, index) =>{
      this.toggle(index)
      clearInterval(i.count);
    }

    toggle(index){
      this.setState({
        items: this.state.items.map((item,i) => {
          if (index === i){
            if (item.optn === "start"){
              item.optn = "stop"
            }else if (item.optn === "stop"){
              item.optn = "start"
            }
          }
          return item
        })
      })
    }

    render(){
      return(
        <Container>
          <h1 className="text-center">CRONOMETROS</h1>
          <hr/>
          <Row>
            {this.state.items.map((item, index) =>
              <Col md={4} key={item.id}>
                <Card className="card text-center" border="primary">
                  <Card.Header as="h2">
                    {this.getHour(item.time)}:{this.getMinutes(item.time)}:{this.getSeconds(item.time)}
                  </Card.Header>
                  {item.update === false ?
                    <Card.Body>
                      <i className="far fa-edit" onClick={() => this.updateItem(index)}></i>
                      <i className="far fa-trash-alt" onClick={() => this._remove(index)}></i>
                      <Card.Title as="h1">{item.task}</Card.Title>
                      <Card.Text>{item.project}</Card.Text>
                      { item.optn === "start" ?
                        <Button variant="info" size="lg" onClick={() => this.handleClickStart(item, index)}>{item.optn}</Button>
                        :
                        <Button variant="warning" size="lg" onClick={() => this.handleClickStop(item , index)}>{item.optn}</Button>
                      }
                    </Card.Body> :
                    <Card.Body>
                      <Form onSubmit={() => this._save(item)}>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="task"
                            placeholder={item.task ? item.task : "Ingresa Tarea"}
                            onChange={this.onInputChange}
                            required/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="project"
                            placeholder={item.project ? item.project : "Ingresa Proyecto"}
                            onChange={this.onInputChange}
                            required/>
                        </Form.Group>
                          <Button variant="outline-success" type="submit">
                            {item.newItem === false ? "Update" : "Create"}
                          </Button>
                        <Button variant="outline-danger" onClick={() => this.noUpdateItem(index)}>Cancelar</Button>
                      </Form>
                    </Card.Body>
                  }
                </Card>
              </Col>
            )}

          </Row>
            <hr/>
              <Col md={{span:4, offset:5}}><Button variant="success" onClick={this._add.bind(this)}>Agregar Cronometro</Button></Col>
        </Container>
      )
    }
  }

  export default App;
