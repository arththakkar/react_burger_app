import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer: false
    };
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    toggleSideDrawerHandler = () => {
        this.setState({showSideDrawer: true});
    }
    render () {
        return (
            <Aux>
                <Toolbar open={this.toggleSideDrawerHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
export default Layout;