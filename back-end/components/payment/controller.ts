import axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import { BaseController } from "../../core";
import { TempOrder } from "../../database/models/TempOrder";
import Utility from "../../helpers/utility";
import { NextFunction, Request, Response } from "../../__types";

export class PaymentController extends BaseController {
	public __component: string = "payment";
	public createPayment = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
		try {
			const { order_id, source_id, customer_id, amount } = req.body;
			const idempotency_key = Utility.uuidv4();
			const postData = {
				amount_money: {
					amount: amount,
					currency: "USD"
				},
				idempotency_key: idempotency_key,
				source_id: source_id,
				customer_id: customer_id,
				order_id: order_id
			}

			const result: AxiosResponse = await axios.post(config.squareUp.base_url + '/v2/payments', postData, {
				headers: {
					"Square-Version": "2021-12-15",
					"Authorization": "Bearer " + global['token'],
					"Content-Type": "application/json"
				}
			});
			return this.json(res, 200, { error: false, success: true, data: result.data });
		} catch (error) {
			return this.json(res, 400, { error: true, success: false, message: 'Square Up Create Payment Error' });
		}
	}

}