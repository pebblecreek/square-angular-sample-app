import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit, OnDestroy {
  code: string = '';
  info: any = null;
  authorizeUrl: string = '';
  state: string = '';
  buttonText = 'Checking';
  queryParamsSub: Subscription;
  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.buttonText = 'Checking';
    const sub = this.authService.getState().subscribe(res => {
      if (res.state) {
        this.buttonText = 'Authorize';
        this.authorizeUrl = environment.base_url + "oauth2/authorize?client_id=" + res.client_id + "&scope=" + environment.permissions + "&session=false&state=" + res.state
      } else {
        this.buttonText = 'Authorized';
      }
      sub.unsubscribe();
    });
    this.queryParamsSub = this.route.queryParams.subscribe(res => {
      this.code = res['code']
      this.state = res['state']
      if (this.code) {
        this.buttonText = 'Checking';
        this.authService.getToken({ code: this.code, state: this.state }).subscribe(res => {
          if (res.success) {
            this.buttonText = 'Authorized';
          } else {
            this.buttonText = 'Authorize';
          }
        })
      }
    })
  }

  ngOnInit(): void {
  }
  getInfo(): void {
    this.authService.getInfo().subscribe(res => {
      this.info = res;
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSub) {
      this.queryParamsSub.unsubscribe();
    }
  }

}

