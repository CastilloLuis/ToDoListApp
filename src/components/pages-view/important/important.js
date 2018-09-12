import React, { Component } from 'react';
import TaskContainer from '../../task-container/task-container';

export default class ImportantView extends Component {
    render() {
        return (
            <TaskContainer
                getViewType={2}
            ></TaskContainer>
        )
    }
}