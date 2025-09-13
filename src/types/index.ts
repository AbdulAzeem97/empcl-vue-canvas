export interface OEM {
  id: string;
  name: string;
  createdAt: string;
}

export interface Model {
  id: string;
  name: string;
  year?: string;
  oemId: string;
  oemName: string;
  createdAt: string;
}

export interface UOM {
  id: string;
  code: string;
  name: string;
  createdAt: string;
}

export type ProductCategory = "RAW_MATERIAL" | "SEMI_FINISHED" | "FINISHED_GOOD";

export interface Product {
  id: string;
  code: string;
  partName: string;
  oemId: string;
  oemName: string;
  modelId: string;
  modelName: string;
  uomId: string;
  uomCode: string;
  standardCost?: number;
  category: ProductCategory;
  createdAt: string;
}

export interface WorkOrder {
  id: string;
  number: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}