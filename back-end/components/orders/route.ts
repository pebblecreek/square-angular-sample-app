import { route } from "../../__types";
import { OrderController } from './controller';
const controller: OrderController = new OrderController();

const routes: route[] = [
	{ path: controller.__component + '/', method: "post", function: controller.createOrder, private: true },
	{ path: controller.__component + '/:location_id/:customer_id', method: "get", function: controller.getOrder, private: true }
];
export default routes;