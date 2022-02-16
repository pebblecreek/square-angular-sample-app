import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class PaymentService {
	constructor(private http: HttpClient) {
	}
	public createPayment(data: Object) {
		return this.http.post<any>(environment.api + 'payment', data)
			.pipe(map(res => {
				return res;
			}));
	}

}