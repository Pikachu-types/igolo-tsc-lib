export type IReminder = {
    name: string;
    nin: string;
    address: string;
    landlord_name: string;
    amount_due: string;
    due_date: string;
    payment_method: string;
};
export type IFirstReminder = {
    day_count: string;
} & IReminder;
export type ISecondReminder = {
    day_count: string;
    action_url: string;
} & IReminder;
export type ILastReminder = {
    action_url: string;
} & IReminder;
export interface LeaseReminderEmailRequest {
    body: ILastReminder | IFirstReminder | ISecondReminder;
    type: 'first' | 'second' | 'final';
    lease: string;
    to: string;
}
