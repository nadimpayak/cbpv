import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'
import { Router } from '@angular/router'
import { Globals2 } from './globals'
import { StorageSessionService } from '../service/storage-session.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private router: Router, private StorageSessionService:StorageSessionService,) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do(() => { }, err => {
            if (err instanceof HttpErrorResponse && err.status == 401) {
                // this.store.dispatch(new fromAuth.Logout())
                this.StorageSessionService.ClearSession("email");
                this.StorageSessionService.ClearSession("agency");

                this.router.navigate(['']);
            }
        })
    }
}