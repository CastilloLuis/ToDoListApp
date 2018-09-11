import React, { Component } from 'react';
import AddTask from '../add-task/add-task';
import TaskView from '../task-view/task-view';
import { Grid, Container } from 'semantic-ui-react';

import { getMyTasks, addTask, deleteTask } from '../../utils/service';
import Task from '../task/task';

export default class Home extends Component {

    state = {
        tasks: []
    }

    async componentDidMount() {
        let r = await this.getTasks();
        console.log(r);
        r === null ? null : this.setState({tasks: r});
    }

    render() {
        return(
            <div>
                <div style={{padding: '20px', display: 'block'}}> 
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
                                            ></TaskView>
                                        </Grid.Column>
                                    )
                                })
                        }
                        </Grid.Row>
                    </Grid>
                </div>
                <AddTask
                    addTask={(val) => this.addTask(val)}
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
            this.getTasks().then((t) => this.setState({tasks: t}));
            /*this.setState({messageHandler: {success: true, error: false}});
            alert('Added successfully');
            this.hideModal();*/
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
}