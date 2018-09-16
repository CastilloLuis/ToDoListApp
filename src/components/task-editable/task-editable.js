import React, { Component } from 'react';
import Task from '../task/task'
import { getSingleTask } from '../../utils/service';
export default class TaskEditable extends Component {
    state = {
        openModal: false,
        isEditAction: false,
        res: ''
    }

    async componentDidMount() {
        await this.activateEditAction(this.props.taskid, this.props.viewType);
    }

    async activateEditAction(id, viewType) {
        /*console.log(this.props) 
        console.log(viewType)*/
        let res = await getSingleTask(id, viewType);
        this.setState({openModal: true})
        this.setState({res: res});
        this.setState({isEditAction: true});
    }

 
    hideModal = (val) => {
        console.warn(val + 'tas claro');
        this.setState({openModal: false});
        this.setState({isEditAction: val});
        this.closeEdit(val);
    }

    closeEdit = (val) => {
        this.props.isEdit(val);
    }

    editedTask = (res) => {
        this.props.editedTask(res);
    }

    render() {
        return(
            <div>
            {
                this.props.isEditAction ?
                    <Task 
                        showModal={() => this.state.openModal}
                        hideModal={(val) => this.hideModal(val)}
                        isEditAction={this.state.isEditAction}
                        res={this.state.res}
                        viewType={this.props.viewType}
                        editedTask={(res) => this.editedTask(res)}
                    ></Task>       : false          
            }
            </div>
        )
    }
}

