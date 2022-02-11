import moment from "moment";
import fs from 'fs';
import { Tokendata } from "../database";
import config from "../config/config";
import axios, { AxiosResponse } from "axios";


export default class Utility {
	public static getToken = async (): Promise<string | null> => {
		const tokenResult = await Tokendata.findOne({ where: { key: "token" } });
		if (tokenResult) {
			const token: {
				access_token: string;
				token_type: string;
				expires_at: Date;
				merchant_id: string;
				refresh_token: string;
				short_lived: boolean;
			} = JSON.parse(tokenResult.val);
			if (moment(token.expires_at).diff(moment()) > 0) {
				return token.access_token;
			} else {
				const postData = {
					client_id: config.squareUp.Application_ID,
					client_secret: config.squareUp.Application_Secret,
					refresh_token: token.refresh_token,
					grant_type: "refresh_token"
				}
				try {
					const result: AxiosResponse = await axios.post(config.squareUp.base_url + '/oauth2/token', postData);
					await tokenResult.update({ val: JSON.stringify(result.data) });
					return result.data.access_token;
				} catch (error) {
					return null;
				}
			}
		}
		return null;
	}
	public static dir = (path): Promise<string> => {
		const dest = global['appRoot'] + global['config'].uploads.path + path;
		fs.mkdirSync(dest, { recursive: true });
		return dest;
	}
	public static async uploadFile(file, types: string[], path, extraVar = '') {
		if (file) {
			const originalFileName = file.originalname.split(".");
			const ext = originalFileName[originalFileName.length - 1];
			if (types.indexOf(ext) === -1) {
				return null;
			}
			const dest = await Utility.dir(path);
			const fileName = (extraVar ? extraVar + '_' : '') + Utility.randomString(10) + moment().format("x") + '.' + ext;
			fs.renameSync(file.path, dest + fileName);
			return global['config'].uploads.path + path + fileName;
		}
	}
	public static deleteFile(path) {
		const fullpath = global['appRoot'] + global['config'].uploads.path + path;
		if (fs.existsSync(fullpath)) {
			fs.unlinkSync(fullpath);
		}
	}
	public static trim = (s, c = ' ') => {
		if (s) {
			if (c === "]") { c = "\\]"; }
			if (c === "\\") { c = "\\\\"; }
			return s.replace(new RegExp(
				"^[" + c + "]+|[" + c + "]+$", "g"
			), "");
		}
		return s;
	}
	public static uploadBase64File = (base64Image, dir, extraVar = '') => {
		base64Image = base64Image.split(';base64,');
		let filePath;
		if (base64Image.length === 2) {
			const ext = base64Image[0].split('/').pop();
			const dest = Utility.dir(dir);
			const fileName = (extraVar ? extraVar + '_' : '') + Utility.randomString(10) + moment().format("x") + '.' + ext;
			filePath = global['config'].uploads.path + dir + fileName;
			fs.writeFileSync(dest + fileName, base64Image[1], { encoding: 'base64' });
		} else {
			filePath = base64Image[0];
		}
		return filePath;
	}
	public static randomString = (length, noOnly = false) => {
		let result = '';
		let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		if (noOnly) {
			characters = '0123456789';
		}
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
}