import React, { Component } from 'react';
import './add-task.css';
import { Button } from 'semantic-ui-react';
import  Task  from '../task/task';
import { addTask } from '../../utils/service';
import MessageHandler from '../messages-handler';

export default class AddTask extends Component {
    constructor() {
        super();
        this.state = {
            openModal: false,
            messageHandler: {
                success: false,
                error: false
            }
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
    }

    /* task add action */
    async addTask(val) { // val from task.js
        let response = await addTask(val); 
        if(response) {
            this.setState({messageHandler: {success: true, error: false}});
            alert('Added successfully');
            this.hideModal();
        } else {
            this.setState({messageHandler: {success: false, error: true}});
            alert('Error while adding');
        }
    }

}