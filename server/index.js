import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', allRoutes);

app.use((err, req, res, next) => {
	const status = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';

	return res.status(status).json({ message, stack: err.stack });
});

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URI);
		console.log('mongoDB is connected');
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

app.listen(PORT, () => {
	connectDB();
	console.log(`server is running on at port ${PORT}`);
});
