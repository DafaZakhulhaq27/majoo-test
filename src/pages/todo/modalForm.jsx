import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Input } from '../../components';
import { addTodo, editTodo } from '../../stores/features/todolist';

const ModalForm = ({detail,type,handleClose,show}) => {
    const dispatch = useDispatch();
    const isAddNote = type === 'add' ;
    const [form,setForm] = useState({
        id : moment().unix(),
        createdAt : moment().format("DD-MM-YYYY hh:mm:ss"),
        status : 0,
        title : '',
        description : ''
    })

    useEffect(() => {
        if(detail){
            setForm({
                ...form, 
                status : detail.status,
                id : detail.id,
                title : detail.title ,
                description : detail.description 
            })     
        }
    },[detail])

    const handleSubmit = e => {
        e.preventDefault();
        if(isAddNote){
            dispatch(addTodo(form))
        }else{
            dispatch(editTodo(form))
        }
        handleClose();
    }
    const handleChange = e => {
        const {value,name} = e.target
        setForm({
            ...form,
            [name] : value
        })
    }

    return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>{isAddNote ? 'Add Note' : 'Edit Note'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Input 
                    required
                    label="Title"
                    value={form.title}
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    placeholder="Enter Title"
                    aria-describedby="titleNote"/>
                <Input 
                    label="description"
                    value={form.description}
                    as="textarea"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    placeholder="Enter Description"
                    aria-describedby="descNote"
                    required
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button type="submit" variant="primary">
                    {
                        isAddNote ? 
                        "Save " : "Update "
                    } 
                    Changes
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>    
  )
}

export default ModalForm