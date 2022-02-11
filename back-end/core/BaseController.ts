import Utility from '../helpers/utility';
import { Response, Request } from '../__types';
const saltedSha256 = require('salted-sha256');
/**
 * @class BaseController
 */
export class BaseController {

	/**
	 * @class BaseController
	 * @method render
	 * @protected
	 *
	 * @param {Response} res
	 * @param {number} statusCode
	 * @param {object} data
	 *
	 * @return {Response}
	 */
	errros: { [key: string]: string } = {
		'create': 'Unable to create %',
		'add': 'Unable to add %',
		'update': 'Unable to update %',
		'save': 'Unable to save %',
		'list': 'Unable to load %',
		'get': 'Unable to load %',
		'exist': '% already exist',
		'delete': 'Can\'t delete this %, Error occurred',
		'remove': 'Can\'t this this %, Error occurred',
		'dontexist': '% doesn\'t exist',
		'login': 'Please Login to continue',
		'signup': 'Cannot Signup right now please try later.',
		'token': 'Failed to authenticate token.',
		'permissions': 'you don\'t have permission'
	};
	constructor() {
	}
	protected json = (res: Response, statusCode: number, data?: object | null): Response => {
		if (!data) {
			return res.sendStatus(statusCode);
		}

		return res.status(statusCode).json(data);
	}
	protected error = (component: string, error) => {
		if (this.errros[error]) {
			return { error: true,  success: false, message: this.errros[error].replace(/%/g, component.charAt(0).toUpperCase() + component.slice(1)) };
		} else {
			return { error: true,  success: false, message: error };
		}
	}
	protected exception = async (req: Request, res: Response, e, component, error) => {
		if(e) {
			if (global['config'].pushError) {
				// const request = {
				// 	url: req.url,
				// 	method: req.method,
				// 	query: req.query,
				// 	body: req.body
				// };
			} else {
				console.log(e);
			}
		}
		return this.json(res, 400, this.error(component, error));
	}

	protected salt = () => {
		const firstString = Utility.randomString(39);
		const number = Math.floor(Math.random() * 30) + 10;
		const secondString = Utility.randomString(39);
		return firstString + number + secondString;
	}

	private secretSalt = (salt: string): string => {
		const saltN = parseInt(salt.substr(39, 41));
		return global['config'].secret.substr(saltN, 100);
	}

	protected passwordEn = (password: string, salt: string): string => {
		const enpass = saltedSha256(password, salt);
		return saltedSha256(enpass, this.secretSalt(salt));
	}



}
