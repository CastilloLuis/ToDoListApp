import React, { Component } from 'react';
import { Button, Card, Container } from 'semantic-ui-react'
import styles from './task-view.css';
 
export default class TaskView extends Component {

    deleteTask = () => {
        this.props.deleteTask();
    }

    editTask = () => {
        this.props.editTask();
    }

    markAsImportant = () => {
        this.props.markAsImportant();
    }

    markAsComplete = () => {
        this.props.markAsComplete();
    }

    unmarkAsImportant = () => {
        this.props.unmarkAsImportant();
    }

    unmarkAsComplete = () => {
        this.props.unmarkAsComplete();
    }

    dragStart = (e) => {
        this.props.dragStart(e);
    }

    onMouseGrab = (id) => {
        document.getElementById(id).style.cursor = 'grab';
    }




    render() {
        return (
            <div 
                id={this.props.id} 
                className={styles.box}
                draggable 
                onDragStart={(e) => this.dragStart(e)} 
                onMouseEnter={() => this.onMouseGrab(this.props.id)}
            >
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
                        {
                            this.props.viewType != 1
                            ? 
                                this.props.viewType === 3 ?
                                (
                                    <Button circular inverted color='red' icon='times circle' onClick={() => this.unmarkAsComplete()}></Button>
                                ) :
                            (
                                <div>
                                    <Button  circular inverted color='red' icon='star' onClick={() => this.unmarkAsImportant()}></Button>
                                    <Button circular inverted color='green' icon='check circle' onClick={() => this.markAsComplete()}></Button>
                                </div>
                            )
                            : (
                                <div>
                                    <Button circular inverted color='yellow' icon='star' onClick={() => this.markAsImportant()}></Button>
                                    <Button circular inverted color='green' icon='check circle' onClick={() => this.markAsComplete()}></Button>
                                </div>
                            )
                        }
                    </Container>
                    <div className='ui two buttons'>
                        <Button style={{display: this.props.viewType != 1 ? 'none' : 'block'}} color='yellow' icon='pencil' onClick={() => this.editTask()}></Button>
                        <Button color='red' icon='trash' onClick={() => this.deleteTask()}></Button>
                    </div>
                </Card.Content>
            </Card>          
            </div>     
        )
    }
}