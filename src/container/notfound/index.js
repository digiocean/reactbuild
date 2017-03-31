import React from "react"
import IndexStyle from "../index.css"

export default ({location}) => (
    <div className={IndexStyle.routerslide}>
        <h2>404</h2>
        <p>找不到页面<code>{location.pathname}</code></p>
    </div>
)
