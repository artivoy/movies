import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { setLoading } from '../interceptors/loading.interceptor';
import { environment } from '../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { MoviesResult } from '../model/movies.model';
import { MovieDetails } from '../model/movie-details.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private httpClient = inject(HttpClient);
  private headers = new HttpHeaders({
    Accept: 'application/json',
    Authorization: `Bearer ${environment.apikey}`
  });

  public getMovies(page: number, language = 'en-US'): Observable<MoviesResult | undefined>{
    const params = new HttpParams()
    .set('language', language)
    .set('page', page);

    return this.httpClient.get<MoviesResult | undefined>(`${environment.apiUrl}3/movie/popular`, {
      context: new HttpContext().set(setLoading, true),
      headers: this.headers,
      params,
    }).pipe(
      catchError(err => {
          console.error('Something went wrong whilegetting movies', err)
          return of()
        }
      )
    )
  }

  public getMovieDetails(id: number, language = 'en-US'): Observable<MovieDetails | never>{

    const params = new HttpParams()
    .set('language', language);

    params.append('language', language);

    return this.httpClient.get<MovieDetails | never>(`${environment.apiUrl}3/movie/${id}`, {
      context: new HttpContext().set(setLoading, true),
      headers: this.headers,
      params
    }).pipe(
      catchError(err => {
        console.error('Something went wrong while getting movie details', err)
        return of()
      })
    )
  }

  public search(query: string, page: number, language = 'en-US'): Observable<MoviesResult  | undefined>{

    const params = new HttpParams()
    .set('query', query)
    .set('language', language)
    .set('page', page);

    return this.httpClient.get<MoviesResult  | undefined>(`${environment.apiUrl}3/search/movie`, {
      context: new HttpContext().set(setLoading, true),
      headers: this.headers,
      params
    }).pipe(
      catchError(err => {
        console.error('Something went wrong while search', err)
        return of()
      })
    )
  }
}
