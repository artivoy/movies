import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setLoading } from '../interceptors/loading.interceptor';
import { environment } from '../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { MoviesResult } from '../model/movies.model';
import { MovieDetails } from '../model/movie-details.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  public sizes = {
    "backdrop_sizes": [
      "w300",
      "w780",
      "w1280",
      "original"
    ],
    "logo_sizes": [
      "w45",
      "w92",
      "w154",
      "w185",
      "w300",
      "w500",
      "original"
    ],
    "poster_sizes": [
      "w92",
      "w154",
      "w185",
      "w342",
      "w500",
      "w780",
      "original"
    ],
  }
  private headers = new HttpHeaders({
    Accept: 'application/json',
    Authorization: `Bearer ${environment.apikey}`
  });

  constructor(private httpClient: HttpClient)

  {}

  public getMovies(page: number, language = 'en-US'): Observable<MoviesResult | undefined>{
    let params = new HttpParams()
    .set('language', language)
    .set('page', page);

    return this.httpClient.get<MoviesResult | undefined>(`${environment.apiUrl}3/movie/popular`, {
      context: new HttpContext().set(setLoading, true),
      headers: this.headers,
      params,
    }).pipe(
      catchError(err => of())
    )
  }

  public getMovieDetails(id: number, language = 'en-US'): Observable<MovieDetails | never>{

    let params = new HttpParams()
    .set('language', language);

    params.append('language', language);

    return this.httpClient.get<MovieDetails | never>(`${environment.apiUrl}3/movie/${id}`, {
      context: new HttpContext().set(setLoading, true),
      headers: this.headers,
      params
    }).pipe(
      catchError(err => of())
    )
  }

  public search(query: string, page: number, language = 'en-US'): Observable<MoviesResult  | undefined>{

    let params = new HttpParams()
    .set('query', query)
    .set('language', language)
    .set('page', page);

    return this.httpClient.get<MoviesResult  | undefined>(`${environment.apiUrl}3/search/movie`, {
      context: new HttpContext().set(setLoading, true),
      headers: this.headers,
      params
    }).pipe(
      catchError(err => of())
    )
  }
}
