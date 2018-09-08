import React, { Component } from 'react';
import { Button, Card } from 'semantic-ui-react'
import moment from 'moment';

export default class TaskView extends Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>Title of note</Card.Header>
                    <Card.Meta>Time here</Card.Meta>
                    <Card.Description>
                    Text will be displayed hereText will be displayed hereText will be displayed here
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button color='yellow' icon='pencil'></Button>
                        <Button color='red' icon='trash' onClick={() => localStorage.removeItem('data')}></Button>
                    </div>
                </Card.Content>
            </Card>               
        )
    }
}