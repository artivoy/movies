import { ChangeDetectionStrategy, Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { MoviesService } from '../../services/movies.service';
import { MovieDetails } from '../../model/movie-details.model';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe, DatePipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    ImgUrlPipe,
    JsonPipe,
    DatePipe,
    CurrencyPipe,
    NgOptimizedImage,
    MatIconModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailComponent implements OnInit {

  public isLoading = inject(LoadingService).loading;
  public details = signal<MovieDetails | undefined>(undefined);

  private readonly router = inject(Router);
  private readonly moviesService = inject(MoviesService);
  private movieId = inject(ActivatedRoute).snapshot.params['id'];


  async ngOnInit(): Promise<void> {
    this.details.set(await firstValueFrom(this.moviesService.getMovieDetails(+this.movieId)));
  }

  home() {
    this.router.navigate(["/"]);
  }
}
