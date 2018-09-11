import React, { Component } from 'react';
import { Button, Card, Container } from 'semantic-ui-react'

export default class TaskView extends Component {

    deleteTask = () => {
        this.props.deleteTask();
    }

    editTask = () => {
        this.props.editTask();
    }

    render() {
        return (
            <div style={{marginBottom: '20px'}}>
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.title}</Card.Header>
                    <Card.Meta>{this.props.date}</Card.Meta>
                    <Card.Description>
                        {this.props.taskDescription}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Container textAlign='center' style={{marginBottom: '2%'}}>
                        <Button circular inverted color='yellow' icon='star'></Button>
                        <Button circular inverted color='green' icon='check circle'></Button>
                    </Container>
                    <div className='ui two buttons'>
                        <Button color='yellow' icon='pencil' onClick={() => this.editTask()}></Button>
                        <Button color='red' icon='trash' onClick={() => this.deleteTask()}></Button>
                    </div>
                </Card.Content>
            </Card>          
            </div>     
        )
    }
}