import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HistorialService } from '../services/historial.service';
import { Historial } from '../models/historial.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  historiales$: Observable<Historial[]> | undefined;
  historialForm!: FormGroup;
  showForm: boolean = false;
  showEditForm: boolean = false;

  constructor(
    private historialService: HistorialService,
    private fb: FormBuilder
  ) {
    this.initForm();
    this.cargarHistoriales();
  }

  initForm(): void {
    this.historialForm = this.fb.group({
      userId: ['', Validators.required],
      droneId: ['', Validators.required],
      name: ['', Validators.required],
      model: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      images: [''],
      type: ['venta', Validators.required],
      condition: ['nuevo', Validators.required],
      location: ['', Validators.required],
      contact: ['', Validators.required],
      category: ['', Validators.required],
      sellerId: ['', Validators.required]
    });
  }
  agregarHistorial() {
    this.showForm = true;
  }
  actualizarFormHistorial() {
    this.showEditForm = true;
  }

  cargarHistoriales(): void {
    this.historiales$ = this.historialService.getHistoriales();
  }

  crearHistorial(): void {
    if (this.historialForm.invalid) {
      this.historialForm.markAllAsTouched();
      return;
    }

    const form = this.historialForm.value;

    const historial = {
      userId: form.userId,
      droneId: form.droneId,
      fecha: new Date(),
      droneSaved: {
        id: form.droneId,
        name: form.name,
        model: form.model,
        price: form.price,
        description: form.description,
        images: form.images.split(',').map((img: string) => img.trim()),
        type: form.type,
        condition: form.condition,
        location: form.location,
        contact: form.contact,
        category: form.category,
        sellerId: form.sellerId
      }
    };

    this.historialService.addHistorial(historial).subscribe(() => {
      this.historialForm.reset(); // limpia el formulario
      this.cargarHistoriales();   // recarga la lista
    });
    this.showForm = false;
  }
 actualizarHistorial(id: string): void {
  if (this.historialForm.invalid) {
      this.historialForm.markAllAsTouched();
      return;
    }

    const form = this.historialForm.value;

    const historialActualizado = {
      userId: form.userId,
      droneId: form.droneId,
      fecha: new Date(),
      droneSaved: {
        id: form.droneId,
        name: form.name,
        model: form.model,
        price: form.price,
        description: form.description,
        images: form.images.split(',').map((img: string) => img.trim()),
        type: form.type,
        condition: form.condition,
        location: form.location,
        contact: form.contact,
        category: form.category,
        sellerId: form.sellerId
      }
    };
    this.showEditForm = false;
    this.historialService.updateHistorial(id, historialActualizado).subscribe(() => {
      this.cargarHistoriales(); // Recargar lista después de actualizar
    });
  }
eliminarHistorial(id: string): void {
    this.historialService.deleteHistorial(id).subscribe(() => {
      this.cargarHistoriales(); // Recargar lista después de eliminar
    });
  }
  // actualizarHistorial y eliminarHistorial se quedan igual
}
