import React from "react"
import {Link} from 'react-router-dom'
import IndexStyle from "../index.css"
import infoStyle from "./index.css"

export default () => (
    <div className={IndexStyle.routerslide}>
        <div className={infoStyle.userlist}>
            <h2>用户列表</h2>
            <ul>
                <li>用户A</li>
                <li>用户B</li>
                <li><Link to="/xxxx">用户C</Link></li>
            </ul>
        </div>
    </div>
)
