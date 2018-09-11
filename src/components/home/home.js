import React, { Component } from 'react';
import AddTask from '../add-task/add-task';
import TaskView from '../task-view/task-view';
import { Grid, Container } from 'semantic-ui-react';

import { getMyTasks } from '../../utils/service';
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
                                            ></TaskView>
                                        </Grid.Column>
                                    )
                                })
                        }
                        </Grid.Row>
                    </Grid>
                </div>
                <AddTask></AddTask>
            </div>
        )
    }

    async getTasks() {
        let res = await getMyTasks();
        return res;
    }

}