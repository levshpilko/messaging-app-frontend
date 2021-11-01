import { /*useState,*/ useCallback } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export default function useHttpCall() {
	// const [error, setError] = useState('');
	// const [isloading, setIsLoading] = useState(false);

	const sendHttpReq = useCallback(async params => {
		// setIsLoading(true);
		try {
			const res = await axios(params);
			return res.data;
		} catch (err) {
			throw err.response.data;
		}
	}, []);

	return { sendHttpReq /*, error, isloading */ };
}
