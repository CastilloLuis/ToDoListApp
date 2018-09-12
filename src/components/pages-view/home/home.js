import React, { Component } from 'react';
import TaskContainer from '../../task-container/task-container';

export default class HomeView extends Component {
    render() {
        return (
            <TaskContainer
                getViewType={1}
            ></TaskContainer>
        )
    }
}