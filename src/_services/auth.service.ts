import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient, } from '@angular/common/http';
import { map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
	}

	public getToken(data: Object) {
		return this.http.post<any>(environment.api + 'auth/gettoken', data)
			.pipe(map(res => {
				return res;
			}));
	}
	public getInfo() {
		return this.http.get<any>(environment.api + 'auth/getinfo');
	}
	public getState() {
		return this.http.get<any>(environment.api + 'auth/state');
	}
}