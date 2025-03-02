import * as admin from "firebase-admin";
import { fcmChannels } from "./notifier";
import { DatabaseFunctions } from "../services/database";
import { notificationType } from "../models";
import { FCMArgs } from "labs-sharable/dist/modules/fcm_models";
export declare class Messaging {
    readonly fcm: admin.messaging.Messaging;
    constructor(fcm: admin.messaging.Messaging);
    sendToTopic({ setter, channel, text, data, topic }: {
        text: {
            title: string;
            description: string;
        };
        topic: string;
        setter: DatabaseFunctions.Writer;
        channel?: fcmChannels;
        data?: {
            arg?: FCMArgs;
            type?: notificationType;
        };
    }): Promise<void>;
}
