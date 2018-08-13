import React, { Component } from 'react';
import Home from '../home/home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Icon, Image, Menu, Sidebar, Grid, Item } from 'semantic-ui-react'
 
export default class SideBar extends Component {
    render() {
        return(
            <Router>
                <Grid>
                    <Grid.Column width={2}>                
                    <Sidebar.Pushable style={{height: '100vh'}}>
                        <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible>
                            <Item as='a'>
                                <Image 
                                    src='https://react.semantic-ui.com/images/wireframe/square-image.png'
                                    size='small'    
                                    circular
                                />
                            </Item>
                            <Link to="/">
                                <Menu.Item as='a'>
                                    <Icon name='home' />
                                    Home
                                </Menu.Item>
                            </Link>                            
                            <Link to="/important">
                                <Menu.Item as='a'>
                                    <Icon name='star' />
                                    Important
                                </Menu.Item>
                            </Link>
                            <Link to="/completed">
                                <Menu.Item as='a'>
                                    <Icon name='check' />
                                    Completed
                                </Menu.Item>
                            </Link>
                        </Sidebar>
                    </Sidebar.Pushable>
                    </Grid.Column>

                    <Grid.Column width={14}>         
                        <Route exact path='/' component={Home} />
                    </Grid.Column>
                </Grid>
          </Router>
        );
    }
}
