import { Expose, plainToInstance } from "class-transformer";
import { AbstractCreationDto } from "../abstracts/creationDto";
import { NotificationRestriction } from "labs-sharable";
import { ExtraNotificationTrayData } from "labs-sharable/dist/modules/notifications";

export type notificationType = "alert" | "payment" | "process" | "info" | "message" | "lease";
export class InboxDto extends AbstractCreationDto {

  @Expose() to: string;
  @Expose() readAt?: number;
  @Expose() message: string;
  @Expose() actor?: string;
  @Expose() restriction: NotificationRestriction;
  @Expose() metadata: ExtraNotificationTrayData;
  @Expose() type: notificationType;


  /**
   * Change record to InboxDto class
   *
   * @param {Record<string, unknown>} obj  json object from db
   * @return {InboxDto} this class
   */
  public static fromJson(obj: Record<string, unknown>)
    : InboxDto {
    const result: InboxDto = plainToInstance(InboxDto, obj,
      { excludeExtraneousValues: true });
    return result;
  }
}


