import { route } from "../../__types";
import { AuthController } from './controller';
const controller: AuthController = new AuthController();

const routes: route[] = [
	{ path: controller.__component + '/state', method: "get", function: controller.state, private: true },
	{ path: controller.__component + '/gettoken', method: "post", function: controller.getToken, private: true },
	{ path: controller.__component + '/getinfo', method: "get", function: controller.getInfo, private: true },
];
export default routes;