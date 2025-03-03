"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messaging = void 0;
const inbox_1 = require("../models/dto/inbox");
const labs_sharable_1 = require("labs-sharable");
class Messaging {
    constructor(fcm) {
        this.fcm = fcm;
    }
    sendToTopic({ setter, channel, text, data, topic }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield setter.createInbox(inbox_1.InboxDto.fromJson({
                    to: topic,
                    actor: null,
                    iat: (0, labs_sharable_1.unixTimeStampNow)(),
                    id: (0, labs_sharable_1.notificationID)(),
                    message: text.description,
                    metadata: Object.assign({ body: text.title }, data === null || data === void 0 ? void 0 : data.arg),
                    type: (_a = data === null || data === void 0 ? void 0 : data.type) !== null && _a !== void 0 ? _a : 'alert',
                    restriction: labs_sharable_1.NotificationRestriction.Admins,
                }));
                const response = yield this.fcm.send({
                    notification: {
                        title: text.title,
                        body: text.description,
                    },
                    topic: topic,
                    // iOS-specific configurations
                    apns: {
                        payload: {
                            aps: {
                                category: channel !== null && channel !== void 0 ? channel : "critical_channel",
                                sound: 'default',
                            },
                        }
                    },
                    // Android-specific configurations
                    android: {
                        notification: {
                            channelId: channel !== null && channel !== void 0 ? channel : "critical_channel",
                            priority: "high",
                            sound: 'default',
                            color: '#84948B', // color for notification icon
                        },
                    },
                    data: Object.assign({}, data && Object.fromEntries(Object.entries(data).map(([key, value]) => [
                        key,
                        key === 'arg' ? JSON.stringify(value) : String(value)
                    ])))
                });
                console.log('Successfully sent message:', response);
            }
            catch (error) {
                console.error('Error sending message:', error);
            }
        });
    }
}
exports.Messaging = Messaging;
//# sourceMappingURL=fcm.js.map