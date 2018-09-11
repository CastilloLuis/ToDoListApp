import React, { Component } from 'react';
import AddTask from '../add-task/add-task';
import TaskView from '../task-view/task-view';
import { Grid, Container } from 'semantic-ui-react';

import { getMyTasks, addTask, deleteTask } from '../../utils/service';
import Task from '../task/task';

export default class Home extends Component {

    state = {
        tasks: [],
        added: false
    }

    async componentDidMount() {
        let r = await this.getTasks();
        console.log(r);
        r === null ? null : this.setState({tasks: r});
    }

    render() {
        return(
            <div className="droppable" 
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDropEvent(e)}
            >
                <div style={{padding: '20px', display: 'block'}} className="holder"> 
                    <Grid columns={3}>
                        <Grid.Row>
                        {this.state.tasks.length === 0 
                            ? console.log('empty tasks') :
                                this.state.tasks.map((t) => {
                                    return (
                                        <Grid.Column key={t.id}>
                                            <TaskView
                                                id={t.id}
                                                title={t.title}
                                                date={t.date}
                                                taskDescription={t.task} 
                                                deleteTask={() => this.deleteTask(t.id)}
                                                editTask={() => this.editTask(t.id)} 
                                                dragStart={(e) => this.onDragStart(e, t.id)}
                                            ></TaskView>
                                        </Grid.Column>
                                    )
                                }).reverse()
                        }
                        </Grid.Row>
                    </Grid>
                </div>
                <AddTask
                    addTask={(val) => this.addTask(val)}
                    added={this.state.added}
                    ></AddTask>
            </div>
        )
    }

    async getTasks() {
        let res = await getMyTasks();
        return res;
    }

    async addTask(val) { // val from task.js
        let response = await addTask(val); 
        if(response) {
            alert('Added successfully');
            this.setState({added: true});
            this.getTasks().then((t) => this.setState({tasks: t}));
        } else {
            this.setState({messageHandler: {success: false, error: true}});
            alert('Error while adding');
        }
    }

    async deleteTask(id) {
        let res = await deleteTask(id);
        this.setState({tasks: res});
    }

    async editTask(id) {
        console.log(`Editing task with id: ${id}`);
    }

    /* drag and drop cards */

    onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    }

    onDragOver = (e) => {
        console.log('ondragover');
        e.preventDefault();
    }

    onDropEvent = (e) => {
        //e.preventDefault();
        try {
            let id = e.dataTransfer.getData('id');
            e.target.appendChild(document.getElementById(id));       
            e.dataTransfer.clearData();     
        } catch (e) {
            console.log('You left the item at the same position');
        }
    }


}