import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<Match[]>(`${this.API_URL}/my-requests`);
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
