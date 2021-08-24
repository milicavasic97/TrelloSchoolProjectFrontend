import React from 'react'
import { NavMenu } from '../NavMenu'
import './Layout.css';

export const Layout = (props) => {
    return (
        <div>
            <NavMenu/>
            <div>
            {props.children}
            </div>
        </div>
    )
}
