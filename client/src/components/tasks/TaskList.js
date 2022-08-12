import axios from 'axios';
import { React, useEffect, useState } from 'react';
import classes from './TaskList.module.scss';
import TaskItem from './TaskItem.js';
import toast from 'react-hot-toast';

function TaskList() {
	const [ taskList, setTaskList ] = useState([]);
	const [ isAddingNew, setIsAddingNew ] = useState(false);
	const [ newTask, setnewTask ] = useState('');

	const addNewTask = async (e) => {
		e.preventDefault();
		if (newTask.length <= 0) {
			toast.error('Task is empty!');
			return;
		}
		try {
			const { data } = await axios.post('/api/tasks', {
				title : newTask
			});
			toast.success('New task created!');
			setTaskList([ { ...data }, ...taskList ]);
			setnewTask('');
			setIsAddingNew(false);
		} catch (err) {
			console.log(err);
		}
	};

	const getTasks = async () => {
		try {
			const { data } = await axios.get('/api/tasks/myTasks');
			setTaskList(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getTasks();
	}, []);

	const addNewButtonClick = () => {
		setIsAddingNew(!isAddingNew);
	};

	const deleteTask = async (id) => {
		try {
			await axios.delete(`/api/tasks/${id}`);
			toast.success('Task deleted successfully!');
			setTaskList(taskList.filter((task) => task._id !== id));
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<div className={classes.topBar}>
				<button type="button" className={classes.addNew} onClick={addNewButtonClick}>
					Add new
				</button>
			</div>
			{isAddingNew && (
				<form className={classes.addNewForm} onSubmit={addNewTask}>
					<input
						type="text"
						value={newTask}
						onChange={(e) => setnewTask(e.target.value)}
						placeholder="Taks title"
					/>
					<button type="submit">Add task</button>
				</form>
			)}
			{taskList.length > 0 ? (
				<table className={classes.taskList_table}>
					<tbody>
						{taskList.map((task) => <TaskItem task={task} deleteTask={deleteTask} key={task._id} />)}
					</tbody>
				</table>
			) : (
				'no tasks found'
			)}
		</div>
	);
}

export default TaskList;
