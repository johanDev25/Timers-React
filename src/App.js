import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row, Button} from 'react-bootstrap';
import uuid from 'uuid/v4'
import Cronometro from './components/Cronometro';

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
      const { items } = this.state;
      return(
        <Container>
          <h1 className="text-center">CRONOMETROS</h1>
          <hr/>
          <Row>
            {items.map((item, index) => {
              return(
                <Col md={4}>
                  <Cronometro
                    item={item}
                    index={index}
                    second={this.getSeconds(item.time)}
                    minute={this.getMinutes(item.time)}
                    hour={this.getHour(item.time)}
                    onUpdate={() => this.updateItem(index)}
                    noUpdate={() => this.noUpdateItem(index)}
                    onInputChange={this.onInputChange}
                    remove={() => this._remove(index)}
                    save={() => this._save(item)}
                    onStart={() => this.handleClickStart(item, index)}
                    onStop={() => this.handleClickStop(item , index)}
                    onSubmit={() => this._save(item)}
                    />
                </Col>
              )
            })}
          </Row>
          <hr/>
          <Col md={{span:4, offset:5}}><Button variant="success" onClick={this._add.bind(this)}>Agregar Cronometro</Button></Col>
        </Container>
      )
    }
  }

  export default App;
