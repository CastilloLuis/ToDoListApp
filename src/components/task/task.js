import React, { Component } from 'react';
import { Button, Checkbox, Form, Card, Transition, TextArea, Icon } from 'semantic-ui-react'
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
                            color='youtube'
                            onClick={() => this.closeModal()}
                            icon='close'
                            style={{marginLeft: '90%'}}
                        />
                        <div style={{padding: '20px'}}>
                            <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} />
                        </div>
                    </Form>
                    </Card.Content>
                </Card>
            </Transition>
            </div>
        );
    }
}