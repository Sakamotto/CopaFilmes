import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmesComponent } from './filmes.component';
import { FilmesService } from './filmes.service';
import { Filme } from '../models/filme';

describe('FilmesComponent', () => {
	let component: FilmesComponent;
	let fixture: ComponentFixture<FilmesComponent>;
	let filmesServices: FilmesService;
	const filmes: Filme[] = [
		{
			id: "tt3606756",
			ano: 2018,
			nota: 8.5,
			titulo: "Os Incríveis 2"
		},
		{
			id: "tt4881806",
			ano: 2018,
			nota: 6.7,
			titulo: "Jurassic World: Reino Ameaçado"
		},
		{
			id: "tt5164214",
			ano: 2018,
			nota: 6.3,
			titulo: "Oito Mulheres e um Segredo"
		},
		{
			id: "tt7784604",
			ano: 2018,
			nota: 7.8,
			titulo: "Hereditário"
		},
		{
			id: "tt4154756",
			ano: 2018,
			nota: 8.8,
			titulo: "Vingadores: Guerra Infinita"
		},
		{
			id: "tt5463162",
			ano: 2018,
			nota: 8.1,
			titulo: "Deadpool 2"
		},
		{
			id: "tt3778644",
			ano: 2018,
			nota: 7.2,
			titulo: "Han Solo: Uma História Star Wars"
		},
		{
			id: "tt3501632",
			ano: 2017,
			nota: 7.9,
			titulo: "Thor: Ragnarok"
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
			declarations: [FilmesComponent],
			providers:
				[
					{ provide: FilmesService, useValue: { obterFilmes: () => filmes } }
				]

		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FilmesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('deve criar', () => {
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
	})
});
