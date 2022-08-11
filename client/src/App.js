import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import Auth from './pages/Auth';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
	return (
		<React.Fragment>
			<Toaster
				position="top-right"
				toastOptions={{
					style : {
						fontSize : '1.8rem'
					}
				}}
			/>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path="/" element={<Home />} />
					<Route path="/edit-profile" element={<EditProfile />} />
				</Route>
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</React.Fragment>
	);
}

export default App;
