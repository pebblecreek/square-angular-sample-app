import { BaseController } from "../../core";
import { NextFunction, Response, Request } from "../../__types";
import axios, { AxiosResponse } from 'axios';
import config from '../../config/config';

export class ProductController extends BaseController {
	public __component: string = "products";
	public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
		try {
			const result: AxiosResponse = await axios.get(config.squareUp.base_url + '/v2/catalog/list?types=IMAGE,ITEM', {
				headers: {
					"Square-Version": "2022-01-20",
					"Authorization": "Bearer " + global['token'],
					"Content-Type": "application/json"
				}
			});
			const Products = result.data.objects.filter(e => e.type === 'ITEM');
			const Images = result.data.objects.filter(e => e.type === 'IMAGE');
			Products.forEach((e, i) => {
				Products[i]['images'] = Images.filter(x => e.item_data.image_ids.indexOf(x.id) > -1);
			});
			return this.json(res, 200, { error: false, success: true, data: { objects: Products } });
		} catch (error) {
			return this.json(res, 400, { error: true, success: false, message: 'Square Up Product Error' });
		}
	}
}