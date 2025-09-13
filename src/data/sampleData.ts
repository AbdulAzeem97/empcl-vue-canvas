import { OEM, Model, UOM, Product, WorkOrder } from "@/types";

export const sampleOEMs: OEM[] = [
  { id: "1", name: "Toyota", createdAt: "2024-01-15" },
  { id: "2", name: "Honda", createdAt: "2024-01-20" },
  { id: "3", name: "BMW", createdAt: "2024-02-01" },
  { id: "4", name: "Mercedes", createdAt: "2024-02-05" },
];

export const sampleModels: Model[] = [
  { id: "1", name: "Camry", year: "2024", oemId: "1", oemName: "Toyota", createdAt: "2024-01-16" },
  { id: "2", name: "Corolla", year: "2023", oemId: "1", oemName: "Toyota", createdAt: "2024-01-17" },
  { id: "3", name: "Civic", year: "2024", oemId: "2", oemName: "Honda", createdAt: "2024-01-21" },
  { id: "4", name: "Accord", year: "2023", oemId: "2", oemName: "Honda", createdAt: "2024-01-22" },
  { id: "5", name: "X5", year: "2024", oemId: "3", oemName: "BMW", createdAt: "2024-02-02" },
  { id: "6", name: "C-Class", year: "2024", oemId: "4", oemName: "Mercedes", createdAt: "2024-02-06" },
];

export const sampleUOMs: UOM[] = [
  { id: "1", code: "PCS", name: "Pieces", createdAt: "2024-01-10" },
  { id: "2", code: "KG", name: "Kilograms", createdAt: "2024-01-10" },
  { id: "3", code: "M", name: "Meters", createdAt: "2024-01-10" },
  { id: "4", code: "L", name: "Liters", createdAt: "2024-01-10" },
  { id: "5", code: "SET", name: "Set", createdAt: "2024-01-10" },
];

export const sampleProducts: Product[] = [
  {
    id: "1",
    code: "ENG-001",
    partName: "Engine Block",
    oemId: "1",
    oemName: "Toyota",
    modelId: "1",
    modelName: "Camry",
    uomId: "1",
    uomCode: "PCS",
    standardCost: 1500.00,
    category: "FINISHED_GOOD",
    createdAt: "2024-01-18"
  },
  {
    id: "2",
    code: "BRK-001",
    partName: "Brake Pad Set",
    oemId: "2",
    oemName: "Honda",
    modelId: "3",
    modelName: "Civic",
    uomId: "5",
    uomCode: "SET",
    standardCost: 120.00,
    category: "FINISHED_GOOD",
    createdAt: "2024-01-23"
  },
  {
    id: "3",
    code: "FLT-001",
    partName: "Oil Filter",
    oemId: "1",
    oemName: "Toyota",
    modelId: "2",
    modelName: "Corolla",
    uomId: "1",
    uomCode: "PCS",
    standardCost: 25.00,
    category: "SEMI_FINISHED",
    createdAt: "2024-01-25"
  },
  {
    id: "4",
    code: "STL-001",
    partName: "Steel Sheet",
    oemId: "3",
    oemName: "BMW",
    modelId: "5",
    modelName: "X5",
    uomId: "2",
    uomCode: "KG",
    standardCost: 5.50,
    category: "RAW_MATERIAL",
    createdAt: "2024-02-03"
  },
];

export const sampleWorkOrders: WorkOrder[] = [
  { id: "1", number: "WO-2024-001", status: "IN_PROGRESS", createdAt: "2024-03-01" },
  { id: "2", number: "WO-2024-002", status: "PENDING", createdAt: "2024-03-02" },
  { id: "3", number: "WO-2024-003", status: "COMPLETED", createdAt: "2024-02-28" },
  { id: "4", number: "WO-2024-004", status: "IN_PROGRESS", createdAt: "2024-03-03" },
];