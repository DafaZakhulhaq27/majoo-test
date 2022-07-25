import React, { useState } from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteTodo, editTodo } from '../../stores/features/todolist'
import ModalForm from './modalForm'

const TodoList = ({list,type}) => {
    const dispatch = useDispatch();
    const [detail,setDetail] = useState({})
    const [showEdit,setShowEdit] = useState(false)
    const isDone = type === 'done';
    let dataList = list.filter((data) => {
        if(isDone){
            return data.status === 1
        }else{
            return data.status === 0
        }
    })
    dataList = dataList.sort((a,b) => {
        if(isDone){
            return new Date(b.createdAt) - new Date(a.createdAt);
        }else{
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
    })


    const handleHideEdit = () => {
        setShowEdit(false);
    }
    const handleEdit = data => {
        setShowEdit(true);
        setDetail(data)
    }
    const handleEditStatus = (status,data) => {
        if (window.confirm(`Are you sure want to ${status ? 'finish' : 'undo'} note ?`)) {
            const dataEdited = {
                ...data,
                status : status
            }
            dispatch(editTodo(dataEdited))    
        }
    }
    const handleDelete = (data) => {
        if (window.confirm(`Are you sure want delete note ?`)) {
            dispatch(deleteTodo(data))
        }
    }

    return  <div className="d-flex flex-column">
            <h3>
                <Badge bg={isDone ? 'success' : 'secondary'}> 
                    {isDone ? 'Done' : 'On Going'}
                </Badge>
            </h3>
            {
                dataList.length ?
                dataList.map((data,index) => (
                    <Card className="mt-3" key={index}>
                        <Card.Header className={isDone ? 'bg-success' : 'bg-secondary'}></Card.Header>
                        <Card.Body>
                            <Card.Title>{data.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{data.createdAt}</Card.Subtitle>
                            <Card.Text>
                               {data.description}
                            </Card.Text>
                            <Button variant="primary" onClick={() => handleEdit(data)}>Edit</Button>
                            {
                                isDone ?
                                <Button className="ms-2" variant="warning" onClick={() => handleEditStatus(0,data)}>Undo</Button> :
                                <>
                                    <Button className="ms-2" variant="danger" onClick={() => handleDelete(data)}>Delete</Button>
                                    <Button className="ms-2" variant="success" onClick={() => handleEditStatus(1,data)}>Done</Button>
                                </>
                            }
                        </Card.Body>
                    </Card>
                )) : 
                <p className="mt-3">Note not found</p>
            }
            <ModalForm 
                detail={detail}
                type="edit"
                show={showEdit} 
                handleClose={handleHideEdit} />
    </div>
}

export default TodoList