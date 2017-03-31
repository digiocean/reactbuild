import React from "react"
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import indexStyle from "./index.css"
import routes from "./routes"

const Index = () => (
    <Router>
        <div className={indexStyle.container}>
            <div className={indexStyle.menu}>
                <ul>
                    <li>
                        <NavLink exact to="/">首页</NavLink>
                    </li>
                    <li>
                        <NavLink to="/desktop">桌面</NavLink>
                    </li>
                    <li>
                        <NavLink to="/user">用户信息</NavLink>
                    </li>
                </ul>
            </div>
            <div className={indexStyle.wrapper}>
                <Route render={({location}) => (
                    <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={350} transitionLeaveTimeout={350}>
                        <Route location={location} key={location.key} path={location.pathname} component={routes[location.pathname]
                            ? routes[location.pathname].component
                            : routes["not"].component}/>
                    </ReactCSSTransitionGroup>
                )}/>
            </div>
        </div>
    </Router>
)

export default Index
