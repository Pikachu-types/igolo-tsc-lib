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
exports.broadcast = exports.sendFCMAlert = void 0;
const labs_sharable_1 = require("labs-sharable");
const fcm_models_1 = require("labs-sharable/dist/modules/fcm_models");
const inbox_1 = require("../models/dto/inbox");
function compileNotification({ param }) {
    var _a, _b;
    return {
        fcm: new fcm_models_1.CustomFCM({
            title: param.title,
            to: param.to.fcm,
            id: (0, labs_sharable_1.generateRandomAlphaNumeric)(5),
            type: (_a = param.type) !== null && _a !== void 0 ? _a : 'alert',
            channel: param.channel,
            body: param.message,
            args: param.fcmargs,
            iosData: {
                title: param.title,
                body: param.message,
                sound: fcm_models_1.NotificationSounds.Default,
            },
        }),
        inbox: inbox_1.InboxDto.fromJson({
            to: param.to.id,
            actor: (_b = param.sender) === null || _b === void 0 ? void 0 : _b.id,
            iat: (0, labs_sharable_1.unixTimeStampNow)(),
            id: (0, labs_sharable_1.notificationID)(),
            metadata: param.metadata,
            restriction: param.restriction,
        })
    };
}
function sendFCMAlert({ fcm, apiKey }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://fcm.googleapis.com/fcm/send", {
                method: "POST",
                body: JSON.stringify(fcm.toMap()),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "key=" + apiKey,
                },
            });
            if (!response.ok) {
                throw new labs_sharable_1.CustomError(`FCM error triggered with bad status code`, response.status);
            }
            else {
                const result = (yield response.json());
                const data = {
                    multicastId: result.multicast_id,
                    success: result.success,
                    failure: result.failure,
                    canonicalIds: result.canonical_ids,
                    results: result.results,
                };
                if (data.success == 1) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
        catch (error) {
            throw new labs_sharable_1.CustomError(`${error}`, 400);
        }
    });
}
exports.sendFCMAlert = sendFCMAlert;
function broadcast({ setter, channel, text, data, to, fcmKey }) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const param = {
            title: text.title,
            message: text.description,
            receiver: to,
            restriction: labs_sharable_1.NotificationRestriction.Admins,
            to: {
                fcm: (_b = (_a = to.fcm) === null || _a === void 0 ? void 0 : _a.token) !== null && _b !== void 0 ? _b : '',
                ios: ((_c = to.fcm) === null || _c === void 0 ? void 0 : _c.device) === 'ios',
                id: to.id,
            },
            type: data === null || data === void 0 ? void 0 : data.type,
            fcmargs: data === null || data === void 0 ? void 0 : data.arg,
            metadata: {
                body: text.title,
                destination: (_d = data === null || data === void 0 ? void 0 : data.arg) === null || _d === void 0 ? void 0 : _d.destinationID,
                image: (_e = data === null || data === void 0 ? void 0 : data.arg) === null || _e === void 0 ? void 0 : _e.image,
            },
            channel: channel !== null && channel !== void 0 ? channel : "critical_channel"
        };
        const message = compileNotification({ param });
        yield sendFCMAlert({ apiKey: fcmKey, fcm: message.fcm });
        yield setter.createInbox(message.inbox);
    });
}
exports.broadcast = broadcast;
//# sourceMappingURL=notifier.js.map