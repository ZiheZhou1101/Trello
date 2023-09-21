import React from 'react'
import { Outlet } from 'react-router-dom'

import Navigation from '../components/Navigation'

export default function NavBar() {
    return (
        <div>
            <div style={{ position: 'fixed', width: '100%' }}>
                <Navigation />
            </div>
            <div style={{ paddingTop: '60px' }}>
                <Outlet />
            </div>
        </div>
    )
}
