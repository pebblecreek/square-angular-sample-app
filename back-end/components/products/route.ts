import { route } from "../../__types";
import { ProductController } from './controller';
const controller: ProductController = new ProductController();

const routes: route[] = [
	{ path: controller.__component + '/', method: "get", function: controller.getProducts, private: true }
];
export default routes;