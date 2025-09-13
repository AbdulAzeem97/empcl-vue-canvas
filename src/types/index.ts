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

export type WorkOrderStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type JobStep = "CUTTING" | "WELDING" | "ASSEMBLY" | "QA" | "FINISHED_GOODS";
export type InventoryTransactionType = "ISSUE" | "RECEIVE";
export type InventoryStatus = "AVAILABLE" | "RESERVED" | "LOW_STOCK" | "OUT_OF_STOCK";

export interface WorkOrder {
  id: string;
  number: string;
  productId: string;
  productName: string;
  quantity: number;
  status: WorkOrderStatus;
  startDate?: string;
  endDate?: string;
  progress: number;
  currentStep: JobStep;
  createdAt: string;
}

export interface WorkOrderStep {
  id: string;
  workOrderId: string;
  step: JobStep;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  startTime?: string;
  endTime?: string;
  completedBy?: string;
  remarks?: string;
  requiredMaterials: BOMItem[];
}

export interface BOM {
  id: string;
  productId: string;
  productName: string;
  version: string;
  isActive: boolean;
  items: BOMItem[];
  createdAt: string;
}

export interface BOMItem {
  id: string;
  bomId: string;
  componentId: string;
  componentName: string;
  componentCode: string;
  quantity: number;
  uomId: string;
  uomCode: string;
  step: JobStep;
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  productCode: string;
  batchNo: string;
  location: string;
  quantityOnHand: number;
  reservedQuantity: number;
  availableQuantity: number;
  uomId: string;
  uomCode: string;
  status: InventoryStatus;
  lastUpdated: string;
}

export interface InventoryTransaction {
  id: string;
  date: string;
  productId: string;
  productName: string;
  productCode: string;
  quantity: number;
  type: InventoryTransactionType;
  workOrderId?: string;
  workOrderNumber?: string;
  step?: JobStep;
  location: string;
  batchNo?: string;
  userId: string;
  userName: string;
  remarks?: string;
}

export interface MaterialIssueRequest {
  workOrderId: string;
  step: JobStep;
  componentId: string;
  availableStock: number;
  quantityToIssue: number;
  location: string;
  batchNo: string;
}

export interface MaterialReceiveRequest {
  productId: string;
  quantity: number;
  location: string;
  batchNo: string;
  remarks?: string;
}