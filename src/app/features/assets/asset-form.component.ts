import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-asset-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold leading-7 text-gray-900">{{isEditing ? 'Edit' : 'Add'}} Asset</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            {{isEditing ? 'Update the details of your asset' : 'Add a new asset to your inventory'}}
          </p>
        </div>
        <button 
          routerLink="/assets"
          class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Cancel
        </button>
      </div>

      <form [formGroup]="assetForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Basic Information -->
        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
          <div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div class="col-span-full">
              <label class="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <input
                type="text"
                formControlName="name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              @if (assetForm.get('name')?.invalid && assetForm.get('name')?.touched) {
                <p class="mt-1 text-sm text-red-600">Name is required</p>
              }
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Type</label>
              <select
                formControlName="type"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="HARDWARE">Hardware</option>
                <option value="SOFTWARE">Software</option>
                <option value="FURNITURE">Furniture</option>
                <option value="VEHICLE">Vehicle</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Status</label>
              <select
                formControlName="status"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="AVAILABLE">Available</option>
                <option value="IN_USE">In Use</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="RETIRED">Retired</option>
              </select>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Purchase Date</label>
              <input
                type="date"
                formControlName="purchaseDate"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Purchase Price</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  formControlName="purchasePrice"
                  class="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label class="block text-sm font-medium leading-6 text-gray-900">Location</label>
              <input
                type="text"
                formControlName="location"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div class="col-span-full">
              <label class="block text-sm font-medium leading-6 text-gray-900">Assigned To</label>
              <input
                type="text"
                formControlName="assignedTo"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div class="col-span-full">
              <label class="block text-sm font-medium leading-6 text-gray-900">Serial Number</label>
              <input
                type="text"
                formControlName="serialNumber"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div class="col-span-full">
              <label class="block text-sm font-medium leading-6 text-gray-900">Notes</label>
              <textarea
                formControlName="notes"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-x-3">
          <button
            type="button"
            routerLink="/assets"
            class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            [disabled]="assetForm.invalid"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
          >
            {{isEditing ? 'Update' : 'Create'}} Asset
          </button>
        </div>
      </form>
    </div>
  `
})
export class AssetFormComponent {
  private fb = inject(FormBuilder);
  private assetService = inject(AssetService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  assetForm: FormGroup;
  isEditing = false;

  constructor() {
    const id = this.route.snapshot.params['id'];
    this.isEditing = !!id;

    this.assetForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      type: ['HARDWARE', Validators.required],
      status: ['AVAILABLE', Validators.required],
      purchaseDate: ['', Validators.required],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
      currentValue: [0],
      location: ['', Validators.required],
      assignedTo: [''],
      serialNumber: [''],
      notes: ['']
    });

    if (this.isEditing) {
      const asset = this.assetService.getAssets()().find(a => a.id === id);
      if (asset) {
        this.assetForm.patchValue({
          ...asset,
          purchaseDate: new Date(asset.purchaseDate).toISOString().split('T')[0]
        });
      }
    }
  }

  onSubmit() {
    if (this.assetForm.valid) {
      const formValue = this.assetForm.value;
      formValue.purchaseDate = new Date(formValue.purchaseDate);
      formValue.currentValue = formValue.purchasePrice; // For simplicity, set current value equal to purchase price

      if (this.isEditing) {
        this.assetService.updateAsset(formValue);
      } else {
        this.assetService.addAsset(formValue);
      }

      this.router.navigate(['/assets']);
    }
  }
}
