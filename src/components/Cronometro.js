import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form} from 'react-bootstrap';

class Cronometro extends Component{
    render(){
      return(
            <div>
                <Card className="card text-center" border="primary" key={this.props.item.id}>
                  <Card.Header as="h2">
                    {this.props.hour}:{this.props.minute}:{this.props.second}
                  </Card.Header>
                  {this.props.item.update === false ?
                    <Card.Body>
                      <i className="far fa-edit" onClick={this.props.onUpdate}></i>
                      <i className="far fa-trash-alt" onClick={this.props.remove}></i>
                      <Card.Title as="h1">{this.props.item.task}</Card.Title>
                      <Card.Text>{this.props.item.project}</Card.Text>
                      { this.props.item.optn === "start" ?
                        <Button variant="info" size="lg" onClick={this.props.onStart}>{this.props.item.optn}</Button>
                        :
                        <Button variant="warning" size="lg" onClick={this.props.onStop}>{this.props.item.optn}</Button>
                      }
                    </Card.Body> :
                    <Card.Body>
                      <Form onSubmit={this.props.save}>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="task"
                            placeholder={this.props.item.task ? this.props.item.task : "Ingresa Tarea"}
                            onChange={this.props.onInputChange}
                            required/>
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="project"
                            placeholder={this.props.item.project ? this.props.item.project : "Ingresa Proyecto"}
                            onChange={this.props.onInputChange}
                            required/>
                        </Form.Group>
                          <Button variant="outline-success" type="submit">
                            {this.props.item.newItem === false ? "Update" : "Create"}
                          </Button>
                        <Button variant="outline-danger" onClick={this.props.noUpdate}>Cancelar</Button>
                      </Form>
                    </Card.Body>
                  }
                </Card>
              </div>
      )
    }
  }

  export default Cronometro;
