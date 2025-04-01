import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HistorialService } from '../services/historial.service';
import { Historial } from '../models/historial.model';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  historiales$: Observable<Historial[]> | undefined;

  constructor(private historialService: HistorialService) {
    this.cargarHistoriales();
  }

  cargarHistoriales(): void {
    this.historiales$ = this.historialService.getHistoriales();
  }

  agregarHistorial(): void {
    const nuevoHistorial = { userId: '12345', droneId: '67890', fecha: new Date().toISOString() };
    this.historialService.addHistorial(nuevoHistorial).subscribe(() => {
      this.cargarHistoriales(); // Recargar lista después de agregar
    });
  }

  actualizarHistorial(id: string): void {
    const historialActualizado = { fecha: new Date().toISOString() }; // Solo actualizamos la fecha
    this.historialService.updateHistorial(id, historialActualizado).subscribe(() => {
      this.cargarHistoriales(); // Recargar lista después de actualizar
    });
  }

  eliminarHistorial(id: string): void {
    this.historialService.deleteHistorial(id).subscribe(() => {
      this.cargarHistoriales(); // Recargar lista después de eliminar
    });
  }
}
