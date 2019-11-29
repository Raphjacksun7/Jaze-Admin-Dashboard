import React from 'react';
import { Route } from 'react-router-dom';

import Menu from './Menu';
import Main from './Main';
import Users from './Users';
import Articles from './Articles';
import Categories from './Categories';
import Analytics from './Analytics';
import CreateCategory from './CreateCategory';


const Dashboard = () =>
    <div className = 'fluid-container' >
    <div className = 'row' >
    <div className = 'aside col-md-2 col-sm-3 sidebarMenu' >
    <Menu />
    </div> 
    <div className = 'main col-md-10' >
    <div className = 'fluid-container' >
    <Route exact path = '/' component = { Main } /> 
    <Route path = '/users' component = { Users } /> 
    <Route path = '/articles' component = { Articles } /> 
    <Route path = '/categories' component = { Categories } /> 
    <Route path = '/analytics' component = { Analytics } /> 
    <Route path = '/createcategory' component = { CreateCategory } /> 
    </div> 
    </div>  
    </div>  
    </div>;

export default Dashboard;