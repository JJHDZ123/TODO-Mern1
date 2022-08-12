import axios from 'axios';
import { React, useEffect, useState } from 'react';
import classes from './TaskList.module.scss';

function TaskList() {
	const [ taskList, setTaskList ] = useState([]);

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

	return (
		<div>
			<div className={classes.topBar}>
				<button type="button" className={classes.addNew}>
					Add new
				</button>
			</div>
			{taskList.length > 0 ? (
				<table className={classes.taskList_table}>
					<tbody>{taskList.map((task) => <h1>{task.title}</h1>)}</tbody>
				</table>
			) : (
				'no tasks found'
			)}
		</div>
	);
}

export default TaskList;
