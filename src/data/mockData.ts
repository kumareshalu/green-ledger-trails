export interface CropBatch {
  id: string;
  farmerName: string;
  farmerId: string;
  cropName: string;
  plantingDate: string;
  location: string;
  status: "planted" | "growing" | "harvested" | "delivered";
  progress: number;
  imageUrl?: string;
  harvestDate?: string;
  paymentStatus: "pending" | "advance_paid" | "completed";
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  totalCrops: number;
  rating: number;
}

export interface Buyer {
  id: string;
  name: string;
  company: string;
}

export const mockFarmers: Farmer[] = [
  { id: "F001", name: "Raj Kumar", location: "Punjab", totalCrops: 12, rating: 4.8 },
  { id: "F002", name: "Priya Sharma", location: "Haryana", totalCrops: 8, rating: 4.9 },
  { id: "F003", name: "Amit Patel", location: "Gujarat", totalCrops: 15, rating: 4.7 },
];

export const mockCropBatches: CropBatch[] = [
  {
    id: "CB001",
    farmerName: "Raj Kumar",
    farmerId: "F001",
    cropName: "Wheat",
    plantingDate: "2024-10-15",
    location: "Punjab",
    status: "growing",
    progress: 65,
    paymentStatus: "advance_paid",
  },
  {
    id: "CB002",
    farmerName: "Priya Sharma",
    farmerId: "F002",
    cropName: "Rice",
    plantingDate: "2024-11-01",
    location: "Haryana",
    status: "harvested",
    progress: 100,
    harvestDate: "2025-01-10",
    paymentStatus: "completed",
  },
  {
    id: "CB003",
    farmerName: "Amit Patel",
    farmerId: "F003",
    cropName: "Cotton",
    plantingDate: "2024-09-20",
    location: "Gujarat",
    status: "planted",
    progress: 30,
    paymentStatus: "pending",
  },
  {
    id: "CB004",
    farmerName: "Raj Kumar",
    farmerId: "F001",
    cropName: "Sugarcane",
    plantingDate: "2024-10-05",
    location: "Punjab",
    status: "growing",
    progress: 50,
    paymentStatus: "advance_paid",
  },
];

export const generateQRCode = (cropId: string): string => {
  // Mock QR code generation - returns a placeholder
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CropChain-${cropId}`;
};
