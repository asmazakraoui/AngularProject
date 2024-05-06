import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterService } from "./register.service";

const TOKEN_HEADER ='Authorization'
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private registerService:RegisterService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //add the jwt token (localStorage) request 
        let authReq=req;
        const accessToken =this.registerService.getAccessToken();
        console.log('inside interceptor');
        if(accessToken!=null)
        {
            authReq=authReq.clone({setHeaders:{Authorization:`Bearer ${accessToken}`},
        });

        }
        return next.handle(authReq);
    }

}
export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    },
]
