/* eslint-disable react/prop-types */
import RemoveIcon from '@mui/icons-material/Remove'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { deleteCard, setCurrentCard } from '../redux/listSlice'
import CardDetails from './CardDetails'
import CardTitle from './CardTitle'

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}
// eslint-disable-next-line react/prop-types
export default function CardsInList({ cardId, index, listId }) {
    const { allCards } = useSelector((state) => state.list)
    const findCard = allCards.find((item) => item.id === cardId)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        dispatch(setCurrentCard(findCard))
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    position: 'relative',
                    alignItems: 'center',
                }}
            >
                <Button
                    style={{ textDecoration: 'none', color: '#606060' }}
                    onClick={handleOpen}
                >
                    {findCard.title}
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6">
                            <CardTitle />
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <CardDetails />
                        </Typography>
                    </Box>
                </Modal>
                <Button
                    style={{ position: 'absolute', right: '0px' }}
                    onClick={() => dispatch(deleteCard({ cardId, listId }))}
                >
                    <RemoveIcon />
                </Button>
            </div>
        </div>
    )
}
