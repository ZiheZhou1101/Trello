import { createTheme, ThemeProvider } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { fetchAllCards, fetchAllLists, getCardsOrders } from './redux/listSlice'
import Board from './routes/Board'
import Error from './routes/Error'
import NavBar from './routes/NavBar'

const router = createBrowserRouter([
    {
        path: '/',
        element: <NavBar />,
        children: [{ path: '', element: <Board />, errorElement: <Error /> }],
    },
    //{ path: '/:cardId', element: <Card />, errorElement: <Error /> },
])

export default function App() {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.list.status)
    const theme = createTheme({
        palatte: {},
        components: {
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        color: '#606060',
                    },
                },
            },
        },
    })
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllLists())
            dispatch(fetchAllCards())
            dispatch(getCardsOrders())
        }
    }, [status, dispatch])

    switch (status) {
        case 'loading': {
            return <div>loading</div>
        }
        case 'succeeded': {
            return (
                <ThemeProvider theme={theme}>
                    <RouterProvider router={router} />
                </ThemeProvider>
            )
        }
        case 'failed': {
            return <div>Error</div>
        }
    }
}
