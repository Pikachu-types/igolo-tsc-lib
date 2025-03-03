import * as admin from "firebase-admin";
import { fcmChannels } from "./notifier";
import { DatabaseFunctions } from "../services/database";
import { notificationType } from "../models";
import { FCMArgs } from "labs-sharable/dist/modules/fcm_models";
import { InboxDto } from '../models/dto/inbox';
import { notificationID, NotificationRestriction, parseInterface, unixTimeStampNow } from "labs-sharable";

export class Messaging {

  readonly fcm: admin.messaging.Messaging;

  constructor(fcm: admin.messaging.Messaging) {
    this.fcm = fcm;
  }

  public async sendToTopic({ setter, channel, text, data, topic }: {
    text: {
      title: string,
      description: string
    },
    topic: string
    setter: DatabaseFunctions.Writer,
    channel?: fcmChannels,
    data?: {
      arg?: FCMArgs,
      type?: notificationType,
    }
  }): Promise<void> {
    try {
      await setter.createInbox(InboxDto.fromJson({
        to: topic,
        actor: null,
        iat: unixTimeStampNow(),
        id: notificationID(),
        message: text.description,
        metadata: {
          body: text.title,
          ...data?.arg,
        },
        type: data?.type ?? 'alert',
        restriction: NotificationRestriction.Admins,
      }));


      const response = await this.fcm.send({
        notification: {
          title: text.title,
          body: text.description,
        },
        topic: topic,
        // iOS-specific configurations
        apns: {
          payload: {
            aps: {
              category: channel ?? "critical_channel", // iOS notification category
              sound: 'default',
            },
          }
        },
        // Android-specific configurations
        android: {
          notification: {
            channelId: channel ?? "critical_channel", // Ensure this matches a created channel on the device
            priority: "high",
            sound: 'default',
            color: '#84948B', // color for notification icon
          },
        },
        data: {
          ...data && Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
              key,
              key === 'arg' ? JSON.stringify(value) : String(value)
            ]),
          ),
        }
      });
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}