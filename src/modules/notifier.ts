import { CustomError, generateRandomAlphaNumeric, notificationID, NotificationRestriction, unixTimeStampNow } from "labs-sharable";
import { CustomFCM, FCMArgs, FCMResponse, NotificationSounds } from "labs-sharable/dist/modules/fcm_models";
import { ExtraNotificationTrayData } from "labs-sharable/dist/modules/notifications";
import { LandlordDto, TenantDto } from "../models";
import { InboxDto, notificationType } from "../models/dto/inbox";
import { DatabaseFunctions } from "../services/database";

export type Account = TenantDto | LandlordDto ;

export type fcmChannels = "critical_channel" | "basic_channel" | "scheduled_channel" | "chat_channel";
/**
 * Interface for BroadCastService compile function
 */
interface BroadcastParm {
  receiver: Account;
  to: {
    fcm: string,
    ios: boolean,
    id: string
  }
  sender?: Account;
  message: string;
  title: string;
  restriction: NotificationRestriction;
  type?: string;
  channel: fcmChannels;
  fcmargs?: FCMArgs;
  metadata?: ExtraNotificationTrayData;
}

function compileNotification({ param }: { param: BroadcastParm }) {
  return {
    fcm: new CustomFCM({
      title: param.title,
      to: param.to.fcm,
      id: generateRandomAlphaNumeric(5),
      type: param.type ?? 'alert',
      channel: param.channel,
      body: param.message,
      args: param.fcmargs,
      iosData: {
        title: param.title,
        body: param.message,
        sound: NotificationSounds.Default,
      },
    }),
    inbox: InboxDto.fromJson({
      to: param.to.id,
      actor: param.sender?.id,
      iat: unixTimeStampNow(),
      id: notificationID(),
      metadata: param.metadata,
      restriction: param.restriction,
    })
  }
}

export async function sendFCMAlert({ fcm, apiKey }:
  { fcm: CustomFCM, apiKey: string }) {
  try {
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      body: JSON.stringify(fcm.toMap()),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "key=" + apiKey,
      },
    });

    if (!response.ok) {
      throw new CustomError(`FCM error triggered with bad status code`, response.status);
    } else {
      const result = (await response.json());

      const data: FCMResponse = {
        multicastId: result.multicast_id,
        success: result.success,
        failure: result.failure,
        canonicalIds: result.canonical_ids,
        results: result.results,
      };
      if (data.success == 1) {
        return 1;
      } else {
        return 0;
      }
    }
  } catch (error) {
    throw new CustomError(`${error}`, 400);
  }
}

export async function broadcast({ setter, channel, text, data, to, fcmKey }: {
  text: {
    title: string,
    description: string
  },
  setter: DatabaseFunctions.Writer,
  fcmKey: string;
  channel?: fcmChannels,
  to: Account,
  data?: {
    arg?: FCMArgs,
    type?: notificationType,
  }
}) {
  const param: BroadcastParm = {
    title: text.title,
    message: text.description,
    receiver: to,
    restriction: NotificationRestriction.Admins,
    to: {
      fcm: to.fcm?.token ?? '',
      ios: to.fcm?.device === 'ios',
      id: to.id,
    },
    type: data?.type,
    fcmargs: data?.arg,
    metadata: {
      body: text.title,
      destination: data?.arg?.destinationID,
      image: data?.arg?.image,
    },
    channel: channel ?? "critical_channel"
  }
  const message = compileNotification({ param });
  await sendFCMAlert({ apiKey: fcmKey, fcm: message.fcm });
  await setter.createInbox(message.inbox);
}