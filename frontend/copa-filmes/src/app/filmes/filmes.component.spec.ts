import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { FilmesComponent } from './filmes.component';
import { FilmesService } from './filmes.service';
import { Filme } from '../models/filme';
import { AppModule } from '../app.module';

describe('FilmesComponent', () => {
	let component: FilmesComponent;
	let fixture: ComponentFixture<FilmesComponent>;
	let filmesServices: FilmesService;
	let router: Router;

	const filmes: Filme[] = [
		{
			id: "tt3606756",
			ano: 2018,
			nota: 8.5,
			titulo: "Os Incríveis 2",
			isSelected: true
		},
		{
			id: "tt4881806",
			ano: 2018,
			nota: 6.7,
			titulo: "Jurassic World: Reino Ameaçado",
			isSelected: true
		},
		{
			id: "tt5164214",
			ano: 2018,
			nota: 6.3,
			titulo: "Oito Mulheres e um Segredo",
			isSelected: true
		},
		{
			id: "tt7784604",
			ano: 2018,
			nota: 7.8,
			titulo: "Hereditário",
			isSelected: true
		},
		{
			id: "tt4154756",
			ano: 2018,
			nota: 8.8,
			titulo: "Vingadores: Guerra Infinita",
			isSelected: true
		},
		{
			id: "tt5463162",
			ano: 2018,
			nota: 8.1,
			titulo: "Deadpool 2",
			isSelected: true
		},
		{
			id: "tt3778644",
			ano: 2018,
			nota: 7.2,
			titulo: "Han Solo: Uma História Star Wars",
			isSelected: true
		},
		{
			id: "tt3501632",
			ano: 2017,
			nota: 7.9,
			titulo: "Thor: Ragnarok",
			isSelected: true
		},
		{
			id: "tt2854926",
			ano: 2018,
			nota: 7.1,
			titulo: "Te Peguei!"
		},
		{
			id: "tt0317705",
			ano: 2004,
			nota: 8,
			titulo: "Os Incríveis"
		},
		{
			id: "tt3799232",
			ano: 2018,
			nota: 6.4,
			titulo: "A Barraca do Beijo"
		},
		{
			id: "tt1365519",
			ano: 2018,
			nota: 6.5,
			titulo: "Tomb Raider: A Origem"
		},
		{
			id: "tt1825683",
			ano: 2018,
			nota: 7.5,
			titulo: "Pantera Negra"
		},
		{
			id: "tt5834262",
			ano: 2018,
			nota: 6.3,
			titulo: "Hotel Artemis"
		},
		{
			id: "tt7690670",
			ano: 2018,
			nota: 5.1,
			titulo: "Superfly"
		},
		{
			id: "tt6499752",
			ano: 2018,
			nota: 7.8,
			titulo: "Upgrade"
		}
	]

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [AppModule, RouterTestingModule],
			providers: [
				{ provide: HttpClient },
				{ provide: FilmesService, useValue: { obterFilmes: () => of(filmes) } }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FilmesComponent);
		component = fixture.componentInstance;

		filmesServices = TestBed.get(FilmesService);
		router = TestBed.get(Router);

		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});

	it('deve carregar a lista de filmes', () => {
		spyOn(filmesServices, 'obterFilmes')
			.and
			.callThrough();

		component.ngOnInit();
		fixture.detectChanges();

		expect(filmesServices.obterFilmes).toHaveBeenCalled();
		expect(component.filmes).toEqual(filmes);
	});

	it('deve retornar a lista de filmes selecionados', () => {
		component.filmes = filmes;
		expect(component.obterFilmesSelecionados().length).toBe(8);
	});

	it('deve navegar para o resultado final', () => {
		spyOn(router, 'navigate');

		component.gerarCampeonato();

		expect(router.navigate)
			.toHaveBeenCalledWith(['/final-campeonato']);
	});

	it('deve abrir snackBar com erro: Você precisa selecionar 8 filmes', () => {
		spyOn(component._snackBar, 'open');
		component.filmes = [];
		component.gerarCampeonato();
		expect(component._snackBar.open)
			.toHaveBeenCalledWith('Você precisa selecionar 8 filmes', 'OK', { duration: 2000 });
	});
});
