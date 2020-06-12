import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmesComponent } from './filmes/filmes.component';
import { FinalCampeonatoComponent } from './final-campeonato/final-campeonato.component';


const routes: Routes = [
  { path: '', component: FilmesComponent, pathMatch: 'full' },
  { path: 'final-campeonato', component: FinalCampeonatoComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
