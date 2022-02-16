import { route } from "../../__types";
import { PaymentController } from './controller';
const controller: PaymentController = new PaymentController();

const routes: route[] = [
	{ path: controller.__component + '/', method: "post", function: controller.createPayment, private: true }
];
export default routes;