import APIAI from 'apiai'
import { apiaiAuth } from '../../config'

const apiai = APIAI(apiaiAuth.token);

export const apiaiPromise = (text) => {
	let request = apiai.textRequest(text, {
		sessionId: 'quickstart-session-id'
	});
	return new Promise((resolve, reject) => {
		request.on('response', (response) => {
			resolve(response);
		});
		request.on('error', (error) => {
			reject(error)
		});
		request.end();
	})
}

