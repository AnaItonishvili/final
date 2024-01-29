import { Outlet } from 'react-router-dom'
import Header from '../header'

function OutletWrapper() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default OutletWrapper