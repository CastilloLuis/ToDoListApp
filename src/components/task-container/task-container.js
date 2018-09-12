import React, { Component } from 'react';
import AddTask from '../add-task/add-task';
import TaskView from '../task-view/task-view';
import { Grid, Container } from 'semantic-ui-react';

import { getMyTasks, addTask, deleteTask, markAsImportant, unmarkAsImportant } from '../../utils/service';
import Task from '../task/task';

export default class TaskContainer extends Component {

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
                                                markAsImportant={() => this.markAsImportant(t.id)}
                                                markAsComplete={() => this.markAsComplete()}
                                                unmarkAsImportant={() => this.unmarkAsImportant(t.id)}
                                                viewType={this.props.getViewType}
                                            ></TaskView>
                                        </Grid.Column>
                                    )
                                }).reverse()
                        }
                        </Grid.Row>
                    </Grid>
                </div>
                <div 
                    style={{display: this.props.getViewType != 1 ? 'none' : 'block'}}
                >
                    <AddTask
                        addTask={(val) => this.addTask(val, this.props.getViewType)}
                        added={this.state.added}
                    ></AddTask>
                </div>
            </div>
        )
    }

    async getTasks() {
        switch(this.props.getViewType) {
            case 1:
                console.log('home view');
                return await getMyTasks(1);
            case 2:
                console.log('important view');
                return await getMyTasks(2);
            case 3:
                console.log('complete view');
                return await getMyTasks(3);
        }
    }

    async addTask(val, type) { // val from task.js
        console.log(val);
        console.log(type);
        let response;
        switch(type) {
            case 1:
                response = await addTask(val, 1);
                break;
            case 2:
                response = await addTask(val, 2);
                break;
            case 3:
                response = await addTask(val, 3);
                break;
        }
        this.evalResponse(response);
    }

    async deleteTask(id) {
        let res = await deleteTask(id, this.props.getViewType);
        this.setState({tasks: res});
    }

    async editTask(id) {
        console.log(`Editing task with id: ${id}`);
    }

    async markAsImportant(id) {
        let t = await markAsImportant(id, 2);
        this.setState({tasks: t.tasks});
    }

    async markAsComplete() {
        console.log('complete task');
    }

    async unmarkAsImportant(id) {
        console.log('unmarked as important... passed to home');
        let t = await unmarkAsImportant(id, 2);
        this.setState({tasks: t.tasks});
    }

    evalResponse = (response) => {
        if(response) {
            alert('Added successfully');
            this.setState({added: true});
            this.getTasks().then((t) => this.setState({tasks: t}));
        } else {
            this.setState({messageHandler: {success: false, error: true}});
            alert('Error while adding');
        }
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