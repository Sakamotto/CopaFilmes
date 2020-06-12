import { Component, OnInit } from '@angular/core';
import { FilmesService } from '../filmes/filmes.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-final-campeonato',
	templateUrl: './final-campeonato.component.html',
	styleUrls: ['./final-campeonato.component.css']
})
export class FinalCampeonatoComponent implements OnInit {

	public resultadoFinal;

	constructor(private filmesService: FilmesService,
		private router: Router
	) { }

	ngOnInit() {
		if (this.filmesService.filmesSelecionados) {
			this.filmesService.gerarCampeonato(this.filmesService.filmesSelecionados)
				.subscribe(data => {
					this.resultadoFinal = data;
				});
		}
	}

	public voltar() {
		this.router.navigate(['']);
	}

}
