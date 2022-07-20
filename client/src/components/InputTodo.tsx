import React, { Fragment, useState } from 'react'
import Button from 'react-bootstrap/Button'

const InputTodo = () => {

    const [description, setDescription] = useState<String>('');

    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch('http://localhost:5000/todos', { 
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });

            window.location.href = '/';
        } catch (error: any) {
            console.error(error.message)
        }
    }

  return (
    <Fragment>
        <h1 className='text-center mt-5'>InputTodo</h1>
        <form className='d-flex mt-5'>
            <input type="text" className='form-control' onChange={e => setDescription(e.target.value)}/>
            <Button variant='success' onClick={onSubmitForm}>Add</Button>
        </form>
    </Fragment>
  )
}

export default InputTodo