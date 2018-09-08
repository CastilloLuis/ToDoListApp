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
                                    src='https://avatars2.githubusercontent.com/u/37077073?s=460&v=4'
                                    size='small'    
                                    circular
                                />
                            </Item>
                            <Link to="/">
                                <Menu.Item>
                                    <Icon name='home' />
                                    Home
                                </Menu.Item>
                            </Link>                            
                            <Link to="/important">
                                <Menu.Item>
                                    <Icon name='star' />
                                    Important
                                </Menu.Item>
                            </Link>
                            <Link to="/completed">
                                <Menu.Item>
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
