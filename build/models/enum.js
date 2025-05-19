"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collections = void 0;
exports.collections = {
    logic: "logic",
    tenants: "tenants",
    landlords: "landlords",
    orgs: "orgs",
    leases: "leases",
    properties: "properties",
    units: "units",
    webhookRetries: "webhook-retries",
    inbox: "inbox",
    checkout: "checkout",
    accounts: "accounts",
    "bank_connect": "bank_connect",
    // activities: "activities", // for processes like bank_connect | direct_debit
};
const pStatus = {
    pending: "pending",
    cancelled: "cancelled",
    reviewing: "reviewing",
    completed: "completed",
};
const frequency = {
    monthly: "monthly",
    yearly: "yearly",
    weekly: "weekly",
    quarterly: "quarterly",
    daily: "daily",
};
const ocStatus = {
    occupied: "occupied",
    vacant: "vacant",
    reserved: "reserved",
    maintenance: "maintenance",
    unknown: "unknown",
    unavailable: "unavailable",
};
const utilities = {
    parking: "parking",
    security: "security",
    gym: "gym",
    pool: "pool",
    powerBackup: "power backup",
    waterSupply: "water supply",
};
//# sourceMappingURL=enum.js.map