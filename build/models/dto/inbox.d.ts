import { AbstractCreationDto } from "../abstracts/creationDto";
import { NotificationRestriction } from "labs-sharable";
import { ExtraNotificationTrayData } from "labs-sharable/dist/modules/notifications";
export type notificationType = "alert" | "payment" | "process" | "info" | "message" | "lease";
export declare class InboxDto extends AbstractCreationDto {
    to: string;
    readAt?: number;
    message: string;
    actor?: string;
    restriction: NotificationRestriction;
    metadata: ExtraNotificationTrayData;
    type: notificationType;
    /**
     * Change record to InboxDto class
     *
     * @param {Record<string, unknown>} obj  json object from db
     * @return {InboxDto} this class
     */
    static fromJson(obj: Record<string, unknown>): InboxDto;
}
