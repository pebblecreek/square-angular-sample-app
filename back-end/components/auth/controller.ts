import { NextFunction, Request, Response } from '../../__types';
import { BaseController } from '../../core';
import { Tokendata } from '../../database';
import axios, { AxiosResponse } from 'axios';
import Utility from '../../helpers/utility';
import config from '../../config/config';

export class AuthController extends BaseController {
	public __component: string = "auth";
	public state = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
		try {
			if (global['token']) {
				return this.json(res, 200, { token: true, success: true, state: '' });
			}
			const state = Utility.randomString(30);
			await Tokendata.create({
				key: state,
				value: state
			});
			return this.json(res, 200, { token: false, success: true, state: state, client_id: config.squareUp.Application_ID });
		} catch (error) {
			return this.exception(req, res, error, 'dlogixs', 'Cannot login right now please try later.');
		}
	}
	public getToken = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
		try {
			const { code, state } = req.body;
			const stateCofirm = await Tokendata.findOne({ where: { key: state } });
			if(stateCofirm) {
				const postData = {
					client_id: config.squareUp.Application_ID,
					client_secret: config.squareUp.Application_Secret,
					code: code,
					grant_type: "authorization_code"
				}
				const result: AxiosResponse = await axios.post(config.squareUp.base_url + '/oauth2/token', postData);
				let token = await Tokendata.findOne({ where: { key: 'token' } });
				if (token) {
					token = await token.update({ val: JSON.stringify(result.data) });
				} else {
					token = await Tokendata.create({
						key: 'token',
						val: JSON.stringify(result.data)
					});
				}
				await stateCofirm.destroy();
				return this.json(res, 200, { error: false, success: true });
			}
			return this.json(res, 200, { error: true, success: false, message: 'Invalid State' });
		} catch (error) {
			console.log(error);
			return this.json(res, 200, { error: true, success: false, message: 'Square Up Error' });
		}
	}
	public getInfo = async (req, res): Promise<Response> => {
		try {
			console.log(global['token']);
			const result: AxiosResponse = await axios.get('https://connect.squareupsandbox.com/v2/merchants/me', {
				headers: {
					"Square-Version": "2022-01-20",
					"Authorization": "Bearer " + global['token'],
					"Content-Type": "application/json"
				}
			});
			return this.json(res, 200, { error: false, success: true, data: result.data });
		} catch (error) {
			console.log(error);
			return this.json(res, 200, { error: true, success: false, message: 'info Error' });
		}
	}
}