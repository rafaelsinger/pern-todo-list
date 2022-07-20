import React, { Fragment, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditTodo from './EditTodo';

const ListTodos = () => {

    type Todo = {
        todo_id: number,
        description: string
    }

    const [todos, setTodos] = useState<Array<Todo>>([]);

    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/todos');
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE',
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error:any) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

  return (
    <Fragment>
        <Table striped bordered hover className='text-center mt-5'>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td><EditTodo id={todo.todo_id} /></td>
                        <td><Button variant='danger' onClick={() => handleDelete(todo.todo_id)}>Delete</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </Fragment>
  )
}

export default ListTodos