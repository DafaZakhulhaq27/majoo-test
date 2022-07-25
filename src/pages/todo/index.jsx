import React, { useEffect,useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodo, todoData } from '../../stores/features/todolist';
import ModalForm from './modalForm';
import TodoList from './todoList';

const Todo = () => {
    const dispatch = useDispatch();
    const todo = useSelector(todoData);
    const [showAdd, setShowAdd] = useState(false);

    const handleShowAdd = () => {
        setShowAdd(true);
    }
    const handleHideAdd = () => {
        setShowAdd(false);
    }

    useEffect(() => {
        if(!todo.isFetched)
        dispatch(fetchTodo());
    });

    return (
        <Container>
            <h1 className="mt-5">Todo List</h1>
            <Button className="my-2" variant="primary" onClick={handleShowAdd}>Add Todo</Button>
            {
                todo.status === 'loading' ?
                <div className="loader"></div> :
                !todo.error ?
                <Row>
                    <Col md="6" className="mt-3">
                        <TodoList list={todo.data} type="ongoing" />
                    </Col>
                    <Col md="6" className="mt-3">
                        <TodoList list={todo.data} type="done" />
                    </Col>
                </Row>
                : <p>{todo.error}</p>
            }
            <ModalForm 
                type="add"
                show={showAdd} 
                handleClose={handleHideAdd} />
        </Container>
    )
}

export default Todo