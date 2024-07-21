import { ChangeDetectionStrategy, Component, DestroyRef, effect, ElementRef, inject, OnInit, signal, viewChild, WritableSignal } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { LoadingService } from '../../services/loading.service';
import { MoviesResult } from '../../model/movies.model';
import { debounceTime, distinctUntilChanged, firstValueFrom, skip } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';
import { MovieComponent } from '../movie/movie.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone: true,
  imports: [
      MatInputModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      FormsModule,
      MovieComponent,
    ]
})

export class MovieListComponent implements OnInit {

  isLoading = inject(LoadingService).loading;

  movies: WritableSignal<MoviesResult | undefined> = signal(undefined);

  public filter = new FormControl(null);
  public page: number = 1;
  public imgPath = environment.imgUrl;

  public paginator = viewChild(MatPaginator, {read: MatPaginator})
  private destroyRef: DestroyRef = inject(DestroyRef);
  private readonly moviesService = inject(MoviesService);
  private readonly router = inject(Router);

  ngOnInit(): void {
      this.gettingMoviesList();

      this.filter.valueChanges
      .pipe(
          skip(1),
          debounceTime(900),
          distinctUntilChanged(),
          takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((_) => {
        if (this.filter.value && this.page != 1){
          this.paginator()?.firstPage();
          return;
        }
        if (this.filter.value){
          this.search(this.filter.value);
          return;
        }
        this.gettingMoviesList();
        this.paginator()?.firstPage();
      })
  }

  async gettingMoviesList(page = 1): Promise<void> {
      this.movies.set(await firstValueFrom(this.moviesService.getMovies(page)));
  }

  async search(query: string, page = 1): Promise<void> {
      this.movies.set(await firstValueFrom(this.moviesService.search(query, page)));
  }

  public paginatorHandle(page: PageEvent): void {
      this.page = page.pageIndex + 1;
      if(this.filter.value) {
        this.search(this.filter.value, this.page)
        return;
      }

      this.gettingMoviesList(this.page);
  }

  public movieDetail(id: number) {
    this.router.navigate(["/movie", id]);
  }
}
