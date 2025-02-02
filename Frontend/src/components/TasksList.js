import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './UpdateTask';
import { useSelector } from "react-redux";
import { setSelectedTask, removeTaskFromList, getTasksFromServer, deleteTasksFromServer } from "../slices/TasksSlice";
import { useDispatch } from "react-redux";

const TasksList = () => {
    const {tasksList} = useSelector((state)=>state.tasks);
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const updateTask = (task) => {
        setModalShow(true);
        dispatch(setSelectedTask(task));
    }

    useEffect(() => {
        dispatch(getTasksFromServer());
    }, [dispatch]);

    const deleteTask = (task) => {
        dispatch(deleteTasksFromServer(task))
            .unwrap()
            .then(() => {
                dispatch(removeTaskFromList(task));
            })
        
    }
    return (
        <>
            <Table striped bordered hover>
            <thead>
            <tr className="text-center">
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                {
                    tasksList && tasksList.map((task, index)=>{
                        return(
                            <tr className="text-center" key={task._id}>
                                <td>{index + 1}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td><Button variant="primary" className="mx-3" onClick={() => updateTask(task)}><i className="bi bi-pencil-square"></i></Button><Button variant="primary" onClick={() => deleteTask(task)}><i className="bi bi-trash3"></i></Button></td>
                            </tr>
                        )
                    })
                }
            
            </tbody>
        </Table>
            <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default TasksList;