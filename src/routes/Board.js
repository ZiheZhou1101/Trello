import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import ListDetails from '../components/ListDetails'
import { updateListOrder } from '../redux/listSlice'

const AllListsStyle = styled.div`
    display: flex;
    //flex-direction: row-reverse;
    //justify-content: flex-end;
`
const SingleList = styled.div`
    border: 1px solid black;
    background-color: lavender;
    flex-basis: 300px;
    flex-grow: 0;
    flex-shrink: 0;
    margin: 10px;
    padding: 5px;
    border-radius: 10px;
    height: 100%;
`

export default function Board() {
    const { allLists } = useSelector((state) => state.list)
    const dispatch = useDispatch()
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result
        if (!destination) return
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return
        const newListOrder = Array.from(allLists.map((list) => list.id))
        newListOrder.splice(source.index, 1)
        newListOrder.splice(destination.index, 0, draggableId)
        dispatch(updateListOrder(newListOrder))
    }

    return (
        <div>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable
                    droppableId="listOrder"
                    type="column"
                    direction="horizontal"
                >
                    {(provided) => (
                        <AllListsStyle
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {allLists.map((list, index) => (
                                <Draggable
                                    draggableId={list.id}
                                    index={index}
                                    key={list.id}
                                >
                                    {(provided) => (
                                        <SingleList
                                            key={list.id}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <ListDetails
                                                list={list}
                                                index={index}
                                            />
                                        </SingleList>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </AllListsStyle>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
