import React from 'react'
// import { Redirect } from 'react-router-dom'
import App from '../app'
import routerComponents from './routerComponents'

const routes = [{
    component: App,
    routes: [
        {
            path: '/',
            component: routerComponents.Home,
            exact: true
        },
        {
            path: '/about',
            component: routerComponents.About,
            exact: true
        },
        {
            path: '*',
            component: routerComponents.NotMatch
        }
    ]
}]

export default routes
