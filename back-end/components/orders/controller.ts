import axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import { BaseController } from "../../core";
import { TempOrder } from "../../database/models/TempOrder";
import Utility from "../../helpers/utility";
import { NextFunction, Response, Request } from "../../__types";

export class OrderController extends BaseController {
	public __component: string = "order";
	public createOrder = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
		try {
			const { customer_id, variation_id } = req.body;
			const lineItems: any[] = [];
			const idempotency_key = Utility.uuidv4();
			variation_id.forEach(el => {
				lineItems.push({ quantity: "1", catalog_object_id: el })

			});
			const postData = {
				idempotency_key: idempotency_key,
				order: {
					location_id: "LKEGVEGKRYY28",
					customer_id: customer_id,
					fulfillments: [
						{
							type: "PICKUP",
							pickup_details: {
								recipient: {
									customer_id: customer_id
								},
								pickup_at: "2022-02-20"
							}
						}
					],
					line_items: lineItems
				}
			}
			const result: AxiosResponse = await axios.post(config.squareUp.base_url + '/v2/orders', postData, {
				headers: {
					"Square-Version": "2021-12-15",
					"Authorization": "Bearer " + global['token'],
					"Content-Type": "application/json"
				}
			});
			if (result.data) {
				await TempOrder.create({
					customer_id: customer_id,
					order_id: result.data.order.id
				});
			}
			return this.json(res, 200, { error: false, success: true, data: result.data });
		} catch (error) {
			console.log(error)
			return this.json(res, 400, { error: true, success: false, message: 'Square Up Create Order Error' });
		}
	}

	public getOrder = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
		try {
			const params = req.params;
			const orderIds: string[] = [];
			const order = await TempOrder.findAll({
				attributes: ['order_id'],
				where: { customer_id: params.customer_id }
			});
			if (order.length > 0) {
				order.forEach(el => {
					orderIds.push(el.order_id);
				});
				const postData = {
					location_id: params.location_id,
					order_ids: orderIds
				}
				const result: AxiosResponse = await axios.post(config.squareUp.base_url + '/v2/orders/batch-retrieve', postData, {
					headers: {
						"Square-Version": "2021-12-15",
						"Authorization": "Bearer " + global['token'],
						"Content-Type": "application/json"
					}
				});
				return this.json(res, 200, { error: false, success: true, data: result.data });
			}
			return this.json(res, 200, { error: false, success: true });
		} catch (error) {
			console.log(error)
			return this.json(res, 400, { error: true, success: false, message: 'Square Up Get Order Error' });
		}
	}
}