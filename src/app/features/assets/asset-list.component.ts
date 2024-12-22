import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetService } from '../../services/asset.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-semibold text-gray-900">Assets</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all assets in your organization</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0">
          <button routerLink="new" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500">
            Add Asset
          </button>
        </div>
      </div>

      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Assigned To</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  @for (asset of assetService.getAssets()(); track asset.id) {
                    <tr>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{asset.name}}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{asset.type}}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <span [class]="getStatusClass(asset.status)">{{asset.status}}</span>
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{asset.location}}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{asset.assignedTo || '-'}}</td>
                      <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button [routerLink]="['edit', asset.id]" class="text-indigo-600 hover:text-indigo-900 mr-4">
                          Edit
                        </button>
                        <button (click)="deleteAsset(asset.id)" class="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AssetListComponent {
  assetService = inject(AssetService);

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (status) {
      case 'AVAILABLE':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'IN_USE':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'MAINTENANCE':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'RETIRED':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return baseClasses;
    }
  }

  deleteAsset(id: string) {
    if (confirm('Are you sure you want to delete this asset?')) {
      this.assetService.deleteAsset(id);
    }
  }
}
