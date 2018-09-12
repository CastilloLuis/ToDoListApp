import React, { Component } from 'react';
import TaskContainer from '../../task-container/task-container';

export default class CompleteView extends Component {
    render() {
        return (
            <TaskContainer
                getViewType={3}
            ></TaskContainer>
        )
    }
}