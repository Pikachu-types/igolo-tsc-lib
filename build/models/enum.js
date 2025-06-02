"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collections = void 0;
exports.collections = {
    logic: "logic",
    tenants: "tenants",
    landlords: "landlords",
    orgs: "orgs",
    leases: "leases",
    charges: "charges",
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
    terminated: "terminated",
};
const frequency = {
    monthly: "monthly",
    yearly: "yearly",
    weekly: "weekly",
    daily: "daily",
    quarterly: "quarterly",
    biannually: "biannually",
    biennial: "biennial",
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