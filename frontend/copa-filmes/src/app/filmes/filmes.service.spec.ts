/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FilmesService } from './filmes.service';
import { Filme } from '../models/filme';

describe('Service: Filmes', () => {

	let service: FilmesService;
	let httpMock: HttpTestingController;

	const mockFilmesSelecionados: Filme[] = [
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
		}
	];

	const vencedores: Filme[] = [
		{
			id: "tt4154756",
			ano: 2018,
			nota: 8.8,
			titulo: "Vingadores: Guerra Infinita"
		},
		{
			id: "tt3606756",
			ano: 2018,
			nota: 8.5,
			titulo: "Os Incríveis 2"
		}
	];

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

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FilmesService],
			imports: [HttpClientTestingModule]
		});

		service = TestBed.get(FilmesService);
		httpMock = TestBed.get(HttpTestingController);
	});

	it('deve criar o serviço', inject([FilmesService], (service: FilmesService) => {
		expect(service).toBeTruthy();
	}));

	it('deve retornar 16 filmes da API', () => {
		service.obterFilmes().subscribe(data => {
			expect(data.length).toBe(16);
			expect(data).toEqual(filmes);
		});

		const request = httpMock.expectOne(`${service.base_url}/filmes`);
		expect(request.request.method).toBe('GET');
		request.flush(filmes);
	});

	it('deve gerar o campeão do campeonato', () => {
		service.gerarCampeonato(mockFilmesSelecionados).subscribe(data => {
			expect(data.length).toBe(2);
		});

		const request = httpMock.expectOne(`${service.base_url}/campeonato`);
		expect(request.request.method).toBe('POST');
		request.flush(vencedores);
	});

	afterEach(() => {
		httpMock.verify();
	});
});
