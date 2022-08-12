import React from 'react';
import Layout from '../components/Layout.js';
import Navbar from '../components/nav/Navbar.js';
import TaskList from '../components/tasks/TaskList.js';

function Home() {
	return (
		<Layout>
			<Navbar />
			<TaskList />
		</Layout>
	);
}

export default Home;
