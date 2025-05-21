import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historial } from '../models/historial.model';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private readonly apiUrl = 'http://localhost:9000/api/historiales';

  constructor(private http: HttpClient) {}

  getHistoriales(): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.apiUrl}`);
  }

  addHistorial(historial: Partial<Historial>) {
    return this.http.post(this.apiUrl, historial);
  }

  updateHistorial(id: string, historial: Partial<Historial>) {
    return this.http.put(`${this.apiUrl}/${id}`, historial);
  }

  deleteHistorial(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
