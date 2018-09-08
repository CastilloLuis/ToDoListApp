import React, { Component } from 'react';
import AddTask from '../add-task/add-task';
import TaskView from '../task-view/task-view';
import { Grid, Container } from 'semantic-ui-react';

export default class Home extends Component {
    render() {
        return(
            <div>
            <Container> 
                <Grid columns={3}>
                    <Grid.Row>
                    <Grid.Column>
                        <TaskView></TaskView>
                    </Grid.Column>
                    <Grid.Column>
                        <TaskView></TaskView>
                    </Grid.Column>
                    <Grid.Column>
                        <TaskView></TaskView>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                    <Grid.Column>
                        <TaskView></TaskView>
                    </Grid.Column>
                    <Grid.Column>
                        <TaskView></TaskView>
                    </Grid.Column>
                    <Grid.Column>
                        <TaskView></TaskView>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
            <AddTask></AddTask>
            </div>
        )
    }
}