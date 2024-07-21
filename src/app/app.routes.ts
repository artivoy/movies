import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';

export const routes: Routes = [

           {   path: '',
                title: 'Movies List',
                loadComponent: () =>
                    import('./components/movie-list/movie-list.component').then((c)=> c.MovieListComponent)
            },
            {   path: "movie/:id",
                title: "Movie Details",
                loadComponent: () => import('./components/movie-detail/movie-detail.component').then((c)=> c.MovieDetailComponent)
            },
            {   path: "**", redirectTo: "/"  }
        ]

