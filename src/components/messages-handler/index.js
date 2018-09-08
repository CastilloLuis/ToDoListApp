import React, { Component } from 'react';
import {SuccessMessage} from './success';
import {ErrorMessage} from './error';

export default class MessageHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
        }
    }

    setSuccessState = (val) => {
        this.setState({success: val})
        console.warn(val)
    };

    setErrorState = (val) => this.setState({error: val});

    render() {
        return (
            <div style={{display: !this.state.success && !this.state.error ? 'none' : 'block'}}>
                <SuccessMessage style={{display: this.state.success && !this.state.error ? 'block' : 'none'}}></SuccessMessage>
                <ErrorMessage style={{display: this.state.error && !this.state.success ? 'block' : 'none'}}></ErrorMessage>
            </div>
        )
    }
}