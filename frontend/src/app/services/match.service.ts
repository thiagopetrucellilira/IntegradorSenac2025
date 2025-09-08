import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Match, MatchRequest, UpdateMatchStatusRequest } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private readonly API_URL = 'http://localhost:8080/api/matches';

  constructor(private http: HttpClient) {}

  requestDonation(donationId: number, request: MatchRequest): Observable<Match> {
    return this.http.post<Match>(`${this.API_URL}?donationId=${donationId}`, request);
  }

  getMyRequests(): Observable<Match[]> {
    // Passar size=0 para forçar retorno de lista simples em vez de página
    return this.http.get<any>(`${this.API_URL}/my?size=0`).pipe(
      map(response => {
        // Se a resposta tem propriedade 'content', é uma página
        if (response && response.content && Array.isArray(response.content)) {
          return response.content;
        }
        // Se já é um array, retorna direto
        if (Array.isArray(response)) {
          return response;
        }
        // Caso contrário, retorna array vazio
        return [];
      })
    );
  }

  getReceivedRequests(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.API_URL}/received`);
  }

  updateMatchStatus(matchId: number, request: UpdateMatchStatusRequest): Observable<Match> {
    return this.http.put<Match>(`${this.API_URL}/${matchId}/status`, request);
  }

  getMatchById(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.API_URL}/${id}`);
  }
}
