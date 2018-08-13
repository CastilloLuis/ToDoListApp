import React, { Component } from 'react';
import './add-task.css';

import { Button } from 'semantic-ui-react';

export default class AddTask extends Component {
    render() {
        return (
            <Button 
                circular 
                primary 
                icon='add' 
                size='massive' 
                className='addButton'
            />
        );
    }
}