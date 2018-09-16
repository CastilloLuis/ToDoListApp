import React, { Component } from 'react';
import { Button, Input, Form, Card, Transition, TextArea, Container, Grid, Label, Loader } from 'semantic-ui-react'
import * as h from '../../utils/helpers';
import { editTask } from '../../utils/service';
import './task.css'

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isloading: false,
            isempty: true,
            title: '',
            task: '',
            isEditAction: false
        }
    }

    componentDidMount() {
      //if(this.props.isEditAction ){ console.log('xdd')} else { this.setState({task: this.props.res[0].task})};
    }

    check() {
        console.log(this.props)
    }

    openModal = () => {
        this.state.visible = this.props.showModal();
        console.log(this.state.visible);
        return this.state.visible;
    };

    closeModal = () => {
        this.setState({isEditAction: false});
        this.setState({visible: false});
        this.props.hideModal(false);
    }; 

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

    async editTask() {
        let res = await editTask({id: this.props.res[0].id, title: this.state.title, task: this.state.task, date: h.getDate()}, this.props.viewType)
        console.log(res)
        this.setState({isloading: true});
        setTimeout(() => {
            this.setState({title: this.state.title})
            this.setState({task: this.state.task});
            this.setState({isloading: false, title: '', task: ''});
            this.editedTask(res);
        }, 2000)  
    }

    editedTask = (res) => {
        this.props.editedTask(res);
    }

    clearForm = () => {
        this.setState({title: ''});
        this.setState({task: ''});
    }

    render() {
        return(
            <div style={{display: this.openModal() ? 'block' : 'none'}} className='addTaskModal'>
                <Transition visible={this.state.visible} animation='scale' duration={200}>
                    <Card className='addTaskModalMain'>
                        <Card.Content>
                        <Form>
                            <Container>
                                {
                                    this.props.isEditAction 
                                    ?
                                        <div>
                                            <Form.Field>
                                                <Input 
                                                    icon='pencil alternate' iconPosition='left'
                                                    placeholder={this.props.res[0].title} 
                                                    onChange={(e) => this.getTaskTitle(e.target.value)}
                                                    defaultValue={this.props.res[0].title}
                                                    onBlur={() => this.onBlurAction()}/>
                                                <Label 
                                                    style={{display: this.state.isempty ? 'block' : 'none'}}
                                                    pointing 
                                                    color='red'>Please enter a value</Label>
                                            </Form.Field>
                                            <TextArea 
                                                onChange={(e) => this.getTaskText(e.target.value)}
                                                //placeholder={this.props.res[0].task}
                                                onFocus={() => {
                                                    this.setState({task:this.props.res[0].task});
                                                    console.log(this.state)
                                                }}
                                                value={this.state.task}
                                                style={{ minHeight: 100 }} >                                        </TextArea>
                                        </div>
                                    :
                                        <div>
                                            <Form.Field>
                                                <Input 
                                                    icon='pencil alternate' iconPosition='left'
                                                    placeholder={'Add your titlee'} 
                                                    onChange={(e) => this.getTaskTitle(e.target.value)}
                                                    onBlur={() => this.onBlurAction()}/>
                                                <Label 
                                                    style={{display: this.state.isempty ? 'block' : 'none'}}
                                                    pointing 
                                                    color='red'>Please enter a value</Label>
                                            </Form.Field>
                                            <TextArea 
                                                onChange={(e) => this.getTaskText(e.target.value)}
                                                placeholder={'Add your task'} 
                                                style={{ minHeight: 100 }} />      
                                        </div>                                  
                                }

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
                                            color={this.props.isEditAction ? 'yellow' : 'green'}
                                            onClick={() => this.props.isEditAction ? this.editTask(this.props.res.id) : this.addTask()}
                                            icon={this.props.isEditAction ? 'pencil' : 'check'}
                                            content={this.props.isEditAction ? 'Edit task' : 'Add Task'}
                                        />
                                        <Button 
                                            style={{display: this.state.isloading ? 'block' : 'none'}}
                                            color={this.props.isEditAction ? 'yellow' : 'green'} 
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