import { CustomFCM, FCMArgs } from "labs-sharable/dist/modules/fcm_models";
import { LandlordDto, TenantDto } from "../models";
import { notificationType } from "../models/dto/inbox";
import { DatabaseFunctions } from "../services/database";
export type Account = TenantDto | LandlordDto;
export type fcmChannels = "critical_channel" | "basic_channel" | "scheduled_channel" | "chat_channel";
export declare function sendFCMAlert({ fcm, apiKey }: {
    fcm: CustomFCM;
    apiKey: string;
}): Promise<0 | 1>;
export declare function broadcast({ setter, channel, text, data, to, fcmKey }: {
    text: {
        title: string;
        description: string;
    };
    setter: DatabaseFunctions.Writer;
    fcmKey: string;
    channel?: fcmChannels;
    to: Account;
    data?: {
        arg?: FCMArgs;
        type?: notificationType;
    };
}): Promise<void>;
