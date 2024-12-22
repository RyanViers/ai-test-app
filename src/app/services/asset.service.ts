import { Injectable, computed, signal } from '@angular/core';

export interface Asset {
  id: string;
  name: string;
  type: 'HARDWARE' | 'SOFTWARE' | 'FURNITURE' | 'VEHICLE' | 'OTHER';
  status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'RETIRED';
  purchaseDate: Date;
  purchasePrice: number;
  currentValue: number;
  location: string;
  assignedTo?: string;
  serialNumber?: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private assets = signal<Asset[]>([]);

  constructor() {
    // Add some mock data
    this.assets.set([
      {
        id: '1',
        name: 'Dell XPS 15',
        type: 'HARDWARE',
        status: 'IN_USE',
        purchaseDate: new Date('2023-01-15'),
        purchasePrice: 1499.99,
        currentValue: 1200.00,
        location: 'Main Office',
        assignedTo: 'John Doe',
        serialNumber: 'DLL123456'
      },
      {
        id: '2',
        name: 'Office Chair',
        type: 'FURNITURE',
        status: 'AVAILABLE',
        purchaseDate: new Date('2023-03-20'),
        purchasePrice: 299.99,
        currentValue: 250.00,
        location: 'Storage'
      }
    ]);
  }

  getAssets() {
    return this.assets;
  }

  addAsset(asset: Omit<Asset, 'id'>) {
    const newAsset = {
      ...asset,
      id: crypto.randomUUID()
    };
    this.assets.update(assets => [...assets, newAsset]);
  }

  updateAsset(asset: Asset) {
    this.assets.update(assets => 
      assets.map(a => a.id === asset.id ? asset : a)
    );
  }

  deleteAsset(id: string) {
    this.assets.update(assets => assets.filter(a => a.id !== id));
  }

  // Add computed signals for dashboard stats
  readonly totalValue = computed(() => 
    this.assets().reduce((sum, asset) => sum + asset.currentValue, 0)
  );

  readonly assetsByStatus = computed(() => 
    this.assets().reduce((acc, asset) => {
      acc[asset.status] = (acc[asset.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  );

  readonly assetsByType = computed(() => 
    this.assets().reduce((acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  );

  // Add search functionality
  searchAssets(query: string) {
    return this.assets().filter(asset => 
      asset.name.toLowerCase().includes(query.toLowerCase()) ||
      asset.location.toLowerCase().includes(query.toLowerCase()) ||
      asset.assignedTo?.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Add sorting functionality
  sortAssets(assets: Asset[], by: keyof Asset, direction: 'asc' | 'desc' = 'asc') {
    return [...assets].sort((a, b) => {
      const valueA = a[by];
      const valueB = b[by];
      
      // Handle undefined values
      if (valueA === undefined && valueB === undefined) return 0;
      if (valueA === undefined) return direction === 'asc' ? 1 : -1;
      if (valueB === undefined) return direction === 'asc' ? -1 : 1;

      // Handle different types
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      if (valueA instanceof Date && valueB instanceof Date) {
        return direction === 'asc' 
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      }

      // Handle numbers and other comparable types
      return direction === 'asc'
        ? (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
        : (valueA > valueB ? -1 : valueA < valueB ? 1 : 0);
    });
  }
}
