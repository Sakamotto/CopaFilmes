import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCampeonatoComponent } from './final-campeonato.component';
import { AppModule } from '../app.module';
import { FilmesService } from '../filmes/filmes.service';
import { of } from 'rxjs';
import { Filme } from '../models/filme';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('FinalCampeonatoComponent', () => {
	let component: FinalCampeonatoComponent;
	let fixture: ComponentFixture<FinalCampeonatoComponent>;
	let filmesServices: FilmesService;

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

	const vencedores = {
		primeiro: {
			id: "tt4154756",
			ano: 2018,
			nota: 8.8,
			titulo: "Vingadores: Guerra Infinita"
		},
		segundo: {
			id: "tt3606756",
			ano: 2018,
			nota: 8.5,
			titulo: "Os Incríveis 2"
		}
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [AppModule, HttpClientTestingModule],
			providers: [
				{ provide: FilmesService, useValue: { gerarCampeonato: () => of(vencedores) } }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FinalCampeonatoComponent);
		component = fixture.componentInstance;

		filmesServices = TestBed.get(FilmesService);

		fixture.detectChanges();
	});

	it('deve criar o componente', () => {
		expect(component).toBeTruthy();
	});

	it('deve carregar os vencedores', () => {
		spyOn(filmesServices, 'gerarCampeonato')
			.and
			.callThrough();

		filmesServices.filmesSelecionados = mockFilmesSelecionados;

		component.ngOnInit();
		fixture.detectChanges();

		expect(filmesServices.gerarCampeonato).toHaveBeenCalled();
		expect(component.resultadoFinal.primeiro.titulo).toBe("Vingadores: Guerra Infinita");
		expect(component.resultadoFinal.segundo.titulo).toBe("Os Incríveis 2");
	});

	it('deve gerar erro carregar os vencedores', () => {

		component.resultadoFinal = null;

		component.ngOnInit();
		fixture.detectChanges();

		expect(fixture.debugElement.query(By.css('card-final-not-found'))).toBeNull();
	});
});
