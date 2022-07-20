import React, {FC, useState, Fragment, FormEvent} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface EditTodoProps {
    id: number
}

const EditTodo:FC<EditTodoProps> = ({id}) => {
    const [show, setShow] = useState(false);
    const [description, setDescription] = useState('');
    const [originalDesc, setOriginalDesc] = useState('');

    const handleClose = () => {
        setDescription(originalDesc)
        setShow(false);
    }
    const handleChange = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const body = { description }
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)            
            })
            setShow(false);     
            window.location.href='/'
        } catch (error: any) {
            console.error(error.message);
        } 
    }
    const handleShow = async () => {
        const response = await fetch(`http://localhost:5000/todos/${id}`);
        const jsonData = await response.json();
        setDescription(jsonData.description);
        setOriginalDesc(jsonData.description);
        setShow(true);
    }
  return (
    <Fragment>
        <Button variant="primary" onClick={handleShow}>
            Edit
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Description</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={description} type='text' autoFocus onChange={e => setDescription(e.target.value)}></Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleChange}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </Fragment>
  )
}

export default EditTodo