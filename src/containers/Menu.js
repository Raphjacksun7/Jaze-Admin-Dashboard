import React from 'react';

import MenuItem from '../components/MenuItem';

class Menu extends React.Component {

    state = { open: false };

    render() {
        return ( <
            div >
            <
            div className = 'brand' >
            <
            h2 className = 'title' > Jaze Admin Panel < /h2> < /
            div > <
            ul >
            <
            MenuItem link = '/'
            linkText = 'Dashboard'
            iconName = 'tachometer' / >
            <
            MenuItem link = '/users'
            linkText = 'Users'
            iconName = 'shopping-cart' / >
            <
            MenuItem link = '/articles'
            linkText = 'Articles'
            iconName = 'tags' / >
            <
            MenuItem link = '/categories'
            linkText = 'Categories'
            iconName = 'list' / >
            <
            /ul>  < /
            div >

        );
    }
}

export default Menu;