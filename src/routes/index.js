import React from 'react'
// import { Redirect } from 'react-router-dom'
import Index from '@views/index'
import Login from '@views/login'
import routerComponents from './routerComponents'

export const routes = [
    {
        path: '/auth/login',
        component: Login,
        requiresAuth: false
    },
    {
        path: '/',
        component: Index,
        routes: [
            {
                path: '/',
                redirect: '/home',
                component: routerComponents.Home,
                requiresAuth: true
            },
            {
                path: '/home',
                component: routerComponents.Home,
                exact: true,
                requiresAuth: true
            },
            {
                path: '/about',
                component: routerComponents.About,
                exact: true,
                requiresAuth: true
            },
            {
                path: '*',
                component: routerComponents.NotMatch,
                requiresAuth: false
            }]
    }
]


export default routes
