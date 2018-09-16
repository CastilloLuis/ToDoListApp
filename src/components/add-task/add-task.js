import React, { Component } from 'react';
import './add-task.css';
import { Button } from 'semantic-ui-react';
import  Task  from '../task/task';

export default class AddTask extends Component {
    constructor() {
        super();
        this.state = {
            openModal: false,
            isEditAction: false,
        }
    }

    render() {
        return (
            <div>
                <Button 
                    circular 
                    primary 
                    icon='add' 
                    size='massive' 
                    className='addButton' 
                    onClick={() => this.openModal()}
                />
                <Task 
                    showModal={() => this.state.openModal}
                    hideModal={() => this.hideModal()}
                    addTask={(val) => this.addTask(val)}
                    isEditAction={this.state.isEditAction}
                ></Task>
            </div>
        );
    }

    openModal = () => {
        this.setState({openModal: true});
        console.log('here')
    }

    hideModal = () => {
        this.setState({openModal: false});
        this.setState({isEditAction: false})
    }

    /* task add action */
    addTask = (val) => {
        this.props.addTask(val).then((r) => this.props.added ? this.hideModal() : false);
    }

    editTask = () => console.log('xd');

}