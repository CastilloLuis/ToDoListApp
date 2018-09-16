import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Icon, Image, Menu, Sidebar, Grid, Item } from 'semantic-ui-react'
import ImportantView from '../pages-view/important/important';
import HomeView from '../pages-view/home/home';
import CompleteView from '../pages-view/complete/complete';

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
                                    src='https://images.sftcdn.net/images/t_optimized,f_auto/p/9f0113e7-99bf-11e6-81dc-676fb6608552/1109336420/ticktick-todo-task-list-logo.png'
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
                            <Link to="/complete">
                                <Menu.Item>
                                    <Icon name='check' />
                                    Completed
                                </Menu.Item>
                            </Link>
                        </Sidebar>
                    </Sidebar.Pushable>
                    </Grid.Column>

                    <Grid.Column width={14}>         
                        <Route exact path='/' component={HomeView} />
                        <Route exact path='/important' component={ImportantView} />
                        <Route exact path='/complete' component={CompleteView} />
                        
                    </Grid.Column>
                </Grid>
          </Router>
        );
    }
}
