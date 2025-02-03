export const collections = {
  logic: "logic",
  tenants: "tenants",
  landlords: "landlord",
  leases: "leases",
  properties: "properties",
  units: "units",
  inbox: "inbox",
  checkout: "checkout",
  accounts: "accounts",
  "bank_connect": "bank_connect",
  // activities: "activities", // for processes like bank_connect | direct_debit
} as const;

const pStatus = {
  pending: "pending",
  cancelled: "cancelled",
  reviewing: "reviewing",
  completed: "completed",
} as const;

const frequency = {
  monthly: "monthly",
  yearly: "yearly",
  weekly: "weekly",
  daily: "daily",
} as const;

const ocStatus = {
  occupied: "occupied",
  vacant: "vacant",
  reserved: "reserved",
  maintenance: "maintenance",
  unknown: "unknown",
  unavailable: "unavailable",
} as const;

const utilities = {
  parking: "parking",
  security: "security",
  gym: "gym",
  pool: "pool",
  powerBackup: "power backup",
  waterSupply: "water supply",
} as const;

export type PaymentFrequency = keyof typeof frequency;
export type OccupancyStatus = keyof typeof ocStatus;
export type Utilities = keyof typeof utilities;
export type ProcessStatus = keyof typeof pStatus;
export type Collections = keyof typeof collections;
