import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { route } from '../__types';
import { MiddleWare } from './';
export default class Routes {
	// Set type as Router if need to get auto compelete from vscode
	private privateRouter: Router = Router();
	private publicRouter: Router = Router();
	private middleWare: MiddleWare = new MiddleWare();
	public constructor() {
		// Reading Component
	}
	public async setRoutes() {
		await fs.readdirSync(path.join(__dirname, '../components')).forEach(async (dir: string) => {
			// Reading routes Dir and filtering only route.ts files
			await fs.readdirSync(path.join(__dirname, '../components/' + dir)).filter((file: string) =>
				(file == 'route.ts' || file == 'route.js')).forEach((routeFile: string) => {
					// Dynamicly Importing routes and setting them in private or public routers
					import('../components/' + dir + '/' + routeFile.replace('.ts', '').replace('.js', '')).then((mode: { default: route[] }) => {
						mode.default
							.forEach(route => {
								this.setRoute(route);
							});
					});
				});
			await fs.readdirSync(path.join(__dirname, '../components/' + dir)).filter((file: string) =>
				(file.indexOf('.ts') === -1 && file.indexOf('.js') === -1)).forEach(async (childDir: string) => {
					// Dynamicly Importing routes and setting them in private or public routers
					await fs.readdirSync(path.join(__dirname, '../components/' + dir + '/' + childDir)).filter((file: string) =>
						(file == 'route.ts' || file == 'route.js')).forEach((routeFile: string) => {
							// Dynamicly Importing routes and setting them in private or public routers
							import('../components/' + dir + '/' + childDir + '/' + routeFile.replace('.ts', '').replace('.js', '')).then((mode: { default: route[] }) => {
								mode.default
									.forEach(route => {
										this.setRoute(route);
									});
							});
						});
				});
		});
	}
	private setRoute(route: route): void {
		if (route.private) {
			this.setPrivate(route);
		} else {
			this.setPublic(route);
		}
	}
	private setPrivate(route: route): void {
		let args = [] as any;
		if (route.path) {
			args.push('/api/' + route.path);
		}
		if (route.role) {
			args.push(this.middleWare.permission(route.role));
		}
		if (route.uploader) {
			args.push(route.uploader);
		}
		if (route.function) {
			args.push(route.function);
		}
		this.privateRouter[route.method](...args);
		// if (route.uploader !== undefined) {
		// 	this.privateRouter[route.method]('/api/' + route.path, route.uploader, route.function);
		// } else {
		// 	this.privateRouter[route.method]('/api/' + route.path, route.function);
		// }
	}
	private setPublic(route: route): void {
		if (route.uploader !== undefined) {
			this.publicRouter[route.method]('/api/' + route.path, route.uploader, route.function);
		} else {
			this.publicRouter[route.method]('/api/' + route.path, route.function);
		}
	}
	get privateRoutes() {
		return this.privateRouter;
	}
	get publicRoutes() {
		return this.publicRouter;
	}
}