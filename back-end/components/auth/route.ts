import { route } from "../../__types";
import { AuthController } from './controller';
const controller: AuthController = new AuthController();

const routes: route[] = [
	{ path: controller.__component + '/state', method: "get", function: controller.state, private: true },
	{ path: controller.__component + '/gettoken', method: "post", function: controller.getToken, private: true },
	{ path: controller.__component + '/getinfo', method: "get", function: controller.getInfo, private: true },
	// { path: controller.__component + '/emailexist', method: "post", function: controller.email, private: false },
	// { path: controller.__component + '/usernameexist', method: "post", function: controller.username, private: false },
	// { path: controller.__component + '/emailverify', method: "post", function: controller.emailVerify, private: false },
	// { path: controller.__component + '/updatetoken', method: "get", function: controller.updateToken, private: true },
	// { path: controller.__component + '/forgetPassword', method: "post", function: controller.forgetPassword, private: false },
	// { path: controller.__component + '/updatePassword', method: "post", function: controller.newPassword, private: false },
	// { path: controller.__component + '/forgetUser_id', method: "post", function: controller.forgetEmail, private: false },
];
export default routes;