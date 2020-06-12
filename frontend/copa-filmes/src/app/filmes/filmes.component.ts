import { Component, OnInit } from '@angular/core';
import { FilmesService } from './filmes.service';
import { Filme } from '../models/filme';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-filmes',
	templateUrl: './filmes.component.html',
	styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {

	constructor(private filmesService: FilmesService,
		private router: Router,
		public _snackBar: MatSnackBar) { }

	public filmes: Filme[] = new Array<Filme>();

	ngOnInit() {
		this.filmesService.obterFilmes()
			.subscribe(data => {
				this.filmes = data;
			});
	}

	public obterFilmesSelecionados(): Filme[] {
		return this.filmes.filter(f => f.isSelected);
	}

	public gerarCampeonato() {
		const filmesSelecionado = this.obterFilmesSelecionados();

		if (filmesSelecionado.length < 8 || filmesSelecionado.length > 8) {
			this.openSnackBar('Você precisa selecionar 8 filmes', 'OK');
			return;
		}

		this.filmesService.filmesSelecionados = filmesSelecionado;
		this.router.navigate(['/final-campeonato']);
	}

	private openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: 2000,
		});
	}

}
