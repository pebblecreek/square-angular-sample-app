import { NextFunction, Request, Response } from 'express';
import { sessionUser } from './sessionUser';
export interface Request extends Request {
	req: {} & object;
	files: { [key: string]: MulterFile[] };
	file: MulterFile;
	user: sessionUser;
	session: [any];
	global: any;
}
export interface MulterFile {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	destination: string;
	filename: string;
	path: string;
	size: number
}
export interface NextFunction extends NextFunction { }
export interface Response extends Response { }