import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	constructor(private http: HttpClient) {
	}
	public getProducts() {
		return this.http.get<any>(environment.api + 'products');
	}
}