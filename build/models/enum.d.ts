export declare const collections: {
    readonly logic: "logic";
    readonly users: "users";
    readonly organizations: "organizations";
    readonly leases: "leases";
    readonly charges: "charges";
    readonly properties: "properties";
    readonly units: "units";
    readonly webhookRetries: "webhook-retries";
    readonly inbox: "inbox";
    readonly checkout: "checkout";
    readonly accounts: "accounts";
    readonly bank_connect: "bank_connect";
};
declare const pStatus: {
    readonly pending: "pending";
    readonly cancelled: "cancelled";
    readonly reviewing: "reviewing";
    readonly completed: "completed";
    readonly terminated: "terminated";
};
declare const frequency: {
    readonly monthly: "monthly";
    readonly yearly: "yearly";
    readonly weekly: "weekly";
    readonly daily: "daily";
    readonly quarterly: "quarterly";
    readonly biannually: "biannually";
    readonly biennial: "biennial";
};
declare const ocStatus: {
    readonly occupied: "occupied";
    readonly vacant: "vacant";
    readonly reserved: "reserved";
    readonly maintenance: "maintenance";
    readonly unknown: "unknown";
    readonly unavailable: "unavailable";
};
declare const utilities: {
    readonly parking: "parking";
    readonly security: "security";
    readonly gym: "gym";
    readonly pool: "pool";
    readonly powerBackup: "power backup";
    readonly waterSupply: "water supply";
};
export type PaymentFrequency = keyof typeof frequency;
export type OccupancyStatus = keyof typeof ocStatus;
export type Utilities = keyof typeof utilities;
export type ProcessStatus = keyof typeof pStatus;
export type Collections = keyof typeof collections;
export {};
