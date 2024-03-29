import React, { Component } from 'react';
import AddTask from '../add-task/add-task';
import TaskView from '../task-view/task-view';
import { Grid } from 'semantic-ui-react';
import { getMyTasks, addTask, deleteTask, markAsImportant, unmarkAsImportant, markAsComplete, unmarkAsComplete } from '../../utils/service';
import TaskEditable from '../task-editable/task-editable';

export default class TaskContainer extends Component {

    state = {
        tasks: [],
        added: false,
        isEdit: false,
        editTaskID: null
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
                                                markAsComplete={() => this.markAsComplete(t.id)}
                                                unmarkAsImportant={() => this.unmarkAsImportant(t.id)}
                                                unmarkAsComplete={() => this.unmarkAsComplete(t.id)}
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
                    {
                        this.state.isEdit ? <TaskEditable isEditAction={this.state.isEdit} editedTask={(res) => this.editedTask(res)} isEdit={(val) => this.closeEdit(val)} taskid={this.state.editTaskID} viewType={this.props.getViewType}/> : false
                    }

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

    closeEdit = async(val) => {
        await this.setState({isEdit: val}); // this value recorrido was: task(child3)-> task-editable(child1) -> task-container(parent)
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
        await this.setState({isEdit: true, editTaskID: id})
        console.log(this.state)
        //this.child.activateEditAction(id, this.props.getViewType);
    }

    editedTask = (res) => {
        console.warn(res); // this res went from: service response -> task(child3)-> task-editable(child1) -> task-container(parent)
        alert('Task edited successfully :)')
        this.setState({tasks: res})
    }

    async markAsImportant(id) {
        let t = await markAsImportant(id, this.props.getViewType);
        this.setState({tasks: t.tasks});
    }

    async markAsComplete(id) {
        console.log('complete task');
        let t = await markAsComplete(id, this.props.getViewType);
        this.setState({tasks: t.tasks});        
    }

    async unmarkAsImportant(id) {
        console.log('unmarked as important... passed to home');
        let t = await unmarkAsImportant(id, this.props.getViewType);
        this.setState({tasks: t.tasks});
    }

    async unmarkAsComplete(id) {
        console.log('unmarked as completed... passed to home or favorites');
        let t = await unmarkAsComplete(id, this.props.getViewType);
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
        e.preventDefault();
        try {
            let id = e.dataTransfer.getData('id');
            e.target.appendChild(document.getElementById(id));       
            e.dataTransfer.clearData();     
        } catch (err) {
            console.log('You left the item at the same position');
        }
    }


}