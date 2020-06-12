import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Filme } from '../models/filme';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FilmesService {

	public base_url = environment.baseUrl;
	public filmesSelecionados: Filme[];

	constructor(private http: HttpClient) { }

	public obterFilmes(): Observable<Filme[]> {
		return this.http.get<Filme[]>(`${this.base_url}/filmes`);
	}

	public gerarCampeonato(filmes: Filme[]): Observable<any> {
		let headers = new HttpHeaders()
			.append('Access-Control-Allow-Origin', '*')
			.append('Content-Type', 'application/json; charset=utf-8');

		return this.http.post<Filme[]>(`${this.base_url}/campeonato`, filmes, { headers: headers });
	}
}
