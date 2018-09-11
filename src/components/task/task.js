import React, { Component } from 'react';
import { Button, Input, Form, Card, Transition, TextArea, Container, Grid, Label, Loader } from 'semantic-ui-react'
import * as h from '../../utils/helpers';
import './task.css'

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isloading: false,
            isempty: true,
            title: '',
            task: ''
        }
    }

    openModal = () => {
        this.state.visible = this.props.showModal();
        return this.state.visible;
    };

    closeModal = () => this.props.hideModal();

    getTaskTitle = (text) => this.setState({title: text});

    getTaskText  = (text) => this.setState({task: text});

    onBlurAction = () => h.EMPTY_VAL.test(this.state.title) ? 
                         this.setState({isempty: true}) : 
                         this.setState({isempty: false});

    addTask = () => {
        this.setState({isloading: true});
        setTimeout(() => {
            let json = { id: h.generateID(), title: this.state.title, task: this.state.task, date: h.getDate() };
            this.props.addTask(json);
            this.setState({isloading: false, title: '', task: ''});
        }, 2000)
    }

    render() {
        return(
            <div style={{display: this.openModal() ? 'block' : 'none'}} className='addTaskModal'>
                <Transition visible={this.state.visible} animation='scale' duration={200}>
                    <Card className='addTaskModalMain'>
                        <Card.Content>
                        <Form>
                            <Container>
                                <Form.Field>
                                    <Input 
                                        icon='pencil alternate' iconPosition='left'
                                        placeholder='Type title' 
                                        onChange={(e) => this.getTaskTitle(e.target.value)}
                                        onBlur={() => this.onBlurAction()}/>
                                    <Label 
                                        style={{display: this.state.isempty ? 'block' : 'none'}}
                                        pointing 
                                        color='red'>Please enter a value</Label>
                                </Form.Field>
                                <TextArea 
                                    onChange={(e) => this.getTaskText(e.target.value)}
                                    placeholder='Tell us more' 
                                    style={{ minHeight: 100 }} />
                            </Container>
                        </Form>
                        </Card.Content>
                        <Container 
                            textAlign='center'
                            style={{marginBottom: '10%'}}
                        >
                            <Grid divided='vertically'>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Button 
                                            icon='close' 
                                            content='Cancel'
                                            color='red' onClick={() => this.closeModal()}
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Button 
                                            style={{display: !this.state.isloading ? 'block' : 'none'}} 
                                            disabled={this.state.isempty}
                                            color='green'
                                            onClick={() => this.addTask()}
                                            icon='check' 
                                            content='Add task'
                                        />
                                        <Button 
                                            style={{display: this.state.isloading ? 'block' : 'none'}}
                                            color='green' 
                                            loading
                                        >
                                            Loadingg ....
                                        </Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </Card>
                </Transition>
            </div>
        );
    }
}