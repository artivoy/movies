import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { Movie } from '../../model/movies.model';
import { environment } from '../../../environments/environment';
import { MatCardModule } from '@angular/material/card';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    MatCardModule,
    ImgUrlPipe,
    NgOptimizedImage],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MovieComponent {
@Input() movie: Movie | undefined;
imgPath = environment.imgUrl;
}
