import React, { Component } from 'react';
import { Button, Checkbox, Form, Card, Transition, TextArea, Icon, Container } from 'semantic-ui-react'
import './task.css'

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    openModal = () => {
        this.state.visible = this.props.showModal();
        console.log(this.state.visible)
        return this.state.visible;
    };

    closeModal = () => {
        this.props.hideModal();
    }

    render() {
        return(
            <div style={{display: this.openModal() ? 'block' : 'none'}} className='addTaskModal'>
            <Transition visible={this.state.visible} animation='scale' duration={200}>
                <Card className='addTaskModalMain'>
                    <Card.Content>
                    <Form>
                        <Button 
                            basic
                            onClick={() => this.closeModal()}
                            icon='close'
                            style={{marginLeft: '90%', color: 'black'}}
                        />
                        <div style={{padding: '20px'}}>
                            <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} />
                        </div>
                    </Form>
                    </Card.Content>
                    <Container 
                        textAlign='center'
                        style={{marginBottom: '10%'}}
                    >
                        <Button color='red' onClick={() => this.closeModal()}>Cancel</Button>
                        <Button primary> Add task</Button>
                    </Container>
                </Card>
            </Transition>
            </div>
        );
    }
}