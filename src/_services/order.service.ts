import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	constructor(private http: HttpClient) {
	}
	public createOrder(data: Object) {
		return this.http.post<any>(environment.api + 'order', data)
			.pipe(map(res => {
				return res;
			}));
	}

	public getOrders(locationId: string, customerId: string) {
		return this.http.get<any>(environment.api + 'order/' + locationId + '/' + customerId);
	}
}