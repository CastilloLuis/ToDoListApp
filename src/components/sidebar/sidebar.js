import React, { Component } from 'react';
import { Home } from '../home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Header, Icon, Image, Menu, Segment, Sidebar, Grid } from 'semantic-ui-react'

export default class SideBar extends Component {
    render() {
        return(
            <Router>
                <Grid>
                    <Grid.Column width={2}>                
                    <Sidebar.Pushable style={{height: '100vh'}}>
                        <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible>
                            <Menu.Item as='a'>
                                <Icon name='home' />
                                <Link to="/">Home</Link>
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <Icon name='star' />
                                <Link to="/important">Important</Link>
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <Icon name='check' />
                                <Link to="/latest">Completed</Link>
                            </Menu.Item>
                        </Sidebar>
                    </Sidebar.Pushable>
                    </Grid.Column>

                    <Grid.Column width={14}>         
                    <h1>HELLO WORLD :D</h1>
                    </Grid.Column>
                </Grid>
          </Router>
        );
    }
}
