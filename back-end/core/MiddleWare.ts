import { BaseController } from './';
import { NextFunction, Response, Request } from '../__types';
import config from '../config/config';
import Utility from '../helpers/utility';

export class MiddleWare extends BaseController {

	public crosHeaders = (req: Request, res: Response, next: NextFunction) => {
		// Website you wish to allow to connect
		const origin = req.headers.origin;
		if (typeof origin == 'string') {
			if (config.allowedDomains.indexOf(origin) > -1) {
				res.setHeader('Access-Control-Allow-Origin', origin);
			}
			res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization, Authorization');
			res.setHeader('Access-Control-Allow-Methods', '' + req.method);
			if (req.headers["access-control-request-headers"]) {
				res.setHeader('Access-Control-Allow-Headers', req.headers["access-control-request-headers"]);
			}
			if (req.headers["access-control-allow-methods"]) {
				res.setHeader('Access-Control-Allow-Methods', req.headers["access-control-allow-methods"]);
			}
			// Request methods you wish to allow

			// Request headers you wish to allow

			// Set to true if you need the website to include cookies in the requests sent
			// to the API (e.g. in case you use sessions)
			res.setHeader('Access-Control-Allow-Credentials', "true");

			// Pass to next layer of middleware
		}
		next();
	}

	public TokenValidator = async (req: Request, res: Response, next: NextFunction) => {
		global['token'] = await Utility.getToken();
		next();
		// const token = this.getToken(req);
		// if (req.method === 'OPTIONS') {
		// 	res.sendStatus(200);
		// 	return;
		// }
		// // decode token
		// if (token) {
		// 	// verifies secret and checks exp
		// 	jwt.verify(token, config.secret, async (err, decoded: SessionUser) => {
		// 		if (err) {
		// 			return res.status(401).json(this.error('auth', 'token'));
		// 		}
		// 		const user = await UserHelper.getUserData(decoded.id, ['id', 'name', 'email', 'role', 'department', 'position', 'token']);
		// 		if (user && user.token == token) {
		// 			req.user = user;
		// 			global['user'] = user;
		// 			next();
		// 		} else {
		// 			return res.status(401).json(this.error('auth', 'token'));
		// 		}
		// 	});
		// } else {
		// 	// if there is no token
		// 	// return an error
		// 	return res.status(401).json(this.error('auth', 'login'));
		// }
	}

	// private getToken = (req: Request): string | null => {
	// 	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
	// 		return req.headers.authorization.split(' ')[1];
	// 	}
	// 	return null;
	// }

	// Example
	// { path: controller.__component + '/', method: "get", function: controller.list, private: true, perm_component: 'comments', permission: 'view all' },
	public permission = (role: string[]) => {
		return async (req, res, next) => {
			try {
				if (req.user) {
					if (role.indexOf(req.user.role) > -1) {
						next();
					} else {
						return res.status(401).json(this.error('auth', 'permissions'));
					}
				} else {
					return res.status(401).json(this.error('auth', 'login'));
				}
			} catch (error) {
				next(error);
			}
		}
	}
}