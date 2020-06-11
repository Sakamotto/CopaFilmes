import { Component, OnInit } from '@angular/core';
import { FilmesService } from './filmes.service';
import { Filme } from '../models/filme';

@Component({
	selector: 'app-filmes',
	templateUrl: './filmes.component.html',
	styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {

	constructor(private filmesService: FilmesService) { }

	public filmes: Filme[];

	ngOnInit() {
		console.log(this.filmesService);
		this.filmesService.obterFilmes()
			.subscribe(data => {
				this.filmes = data;
			});
	}

	public obterFilmesSelecionados(): Filme[] {
		return this.filmes.filter(f => f.isSelected);
	}

	public gerarCampeonato() {
		this.filmesService.gerarCampeonato(this.obterFilmesSelecionados())
			.subscribe(data => console.log('data: ', data));
	}

}
