import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoadingService } from "../services/loading.service";

export const setLoading =
  new HttpContextToken<boolean>(() => false);

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.context.get(setLoading)) {
      this.loadingService.loadingOn();

      return next.handle(req).pipe(
        finalize(() => {
          this.loadingService.loadingOff();
        })
      );
    }

    return next.handle(req);
  }
}
