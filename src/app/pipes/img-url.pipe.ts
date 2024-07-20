import { inject, Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imgUrl',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {
  private imgPath = environment.imgUrl;
  private sanitizer = inject( DomSanitizer);

  transform(value: string | undefined) {
    return this.sanitizer.bypassSecurityTrustUrl(`${this.imgPath}w500${value}`);
  }

}
