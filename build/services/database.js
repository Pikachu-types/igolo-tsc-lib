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
exports.DatabaseFunctions = void 0;
const models_1 = require("../models");
const labs_sharable_1 = require("labs-sharable");
const unit_1 = require("../models/dto/unit");
const modules_1 = require("../modules");
const http_1 = require("./http");
var DatabaseFunctions;
(function (DatabaseFunctions) {
    /**
    * Database helper class
    */
    class Getters {
        constructor(admin) {
            this.db = admin;
        }
        /**
          * Go to database said collection and get all
          * @return {Promise<LeaseDto[]>} returns list.
          */
        getLeases() {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(models_1.collections.leases).get();
                return source.docs.map((e) => models_1.LeaseDto.fromJson(e.data()));
            });
        }
        /**
         * Retrieves bank connect processes for a given ID.
         *
         * @param id - The unique identifier for the bank connect process.
         * @returns {Promise<ConnectMyBankDto?>} A promise that resolves to an array of ConnectMyBankDto objects.
         */
        getBankConnectProcesses({ id, reference }) {
            return __awaiter(this, void 0, void 0, function* () {
                let source;
                if (id) {
                    source = yield this.db.collection(models_1.collections.bank_connect)
                        .where('id', '==', id)
                        .get();
                }
                else if (reference) {
                    source = yield this.db.collection(models_1.collections.bank_connect)
                        .where('reference', '==', reference)
                        .get();
                    if (source.docs.length < 1)
                        return;
                    return source.docs.map((e) => models_1.ConnectMyBankDto.fromJson(e.data()))[0];
                }
                else {
                    return;
                }
            });
        }
        getProperty(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(models_1.collections.properties).doc(id).get();
                if (!source.exists)
                    throw new labs_sharable_1.CustomError("No such property of id: " + id);
                return models_1.PropertyDto.fromJson((0, labs_sharable_1.parseInterface)(source.data()));
            });
        }
        getOrganisation(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(models_1.collections.organizations).doc(id).get();
                if (!source.exists)
                    throw new labs_sharable_1.CustomError("No such organisation of id: " + id);
                return models_1.OrganisationDto.fromJson((0, labs_sharable_1.parseInterface)(source.data()));
            });
        }
        getUnit(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(models_1.collections.units).doc(id).get();
                if (!source.exists)
                    throw new labs_sharable_1.CustomError("No such unit of id: " + id);
                return unit_1.UnitDto.fromJson((0, labs_sharable_1.parseInterface)(source.data()));
            });
        }
        getDocument({ id, collection }) {
            return __awaiter(this, void 0, void 0, function* () {
                const source = yield this.db.collection(collection).doc(id)
                    .get();
                if (!source.exists)
                    return;
                return source.data();
            });
        }
    }
    DatabaseFunctions.Getters = Getters;
    /**
    * Database helper class
    */
    class Writer {
        constructor(admin) {
            this.db = admin;
        }
        /**
         * Sends a webhook request to the specified URL with the provided body and retries on failure.
         *
         * @param {Object} params - The parameters for sending the webhook.
         * @param {string} params.url - The URL to which the webhook request is sent.
         * @param {any} params.body - The body of the webhook request.
         * @param {string} params.documentId - The unique identifier of the document associated with the webhook.
         * @param {WebhookRetry["documentType"]} params.documentType - The type of the document associated with the webhook.
         *
         * @returns {Promise<boolean>} - Returns a promise that resolves to true if the webhook is sent successfully, or false if it fails and is queued for retry.
         *
         * @throws Will log an error message if the webhook request fails.
         */
        sendWebhookWithRetry({ url, body, documentId, documentType, }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield http_1.Http.post({ url, body });
                    return true;
                }
                catch (error) {
                    console.error(`Webhook failed for ${documentId}. Error:`, error);
                    // Save failed webhook for retry
                    const retry = {
                        id: this.db.collection(models_1.collections.webhookRetries).doc().id,
                        url,
                        body,
                        documentId,
                        documentType,
                        createdAt: (0, labs_sharable_1.unixTimeStampNow)(),
                        lastAttempt: (0, labs_sharable_1.unixTimeStampNow)(),
                        attempts: 1,
                        maxAttempts: 5,
                    };
                    yield this.db.collection(models_1.collections.webhookRetries).doc(retry.id).set(retry);
                    return false;
                }
            });
        }
        /**
         * Manages a document in the specified collection by either setting or updating it.
         *
         * @param {Object} params - The parameters for managing the document.
         * @param {Record<string, unknown>} params.data - The data to set or update in the document.
         * @param {string} params.id - The ID of the document to manage.
         * @param {boolean} [params.setter=false] - Determines whether to set (true) or update (false) the document.
         * @param {keyof typeof collections} params.collection - The collection in which the document resides.
         *
         * @returns {Promise<void>} A promise that resolves when the operation is complete.
         */
        manageDocument({ data, id, setter = false, collection }) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = this.db.
                    collection(collection).doc(id);
                if (setter) {
                    yield query.set(data);
                }
                else {
                    yield query.update(data);
                }
            });
        }
        createInbox(inbox) {
            return __awaiter(this, void 0, void 0, function* () {
                let source;
                if (inbox.to.startsWith("org_")) {
                    source = this.db.collection(models_1.collections.organizations)
                        .doc((inbox.to))
                        .collection(models_1.collections.inbox);
                }
                else if (inbox.to.startsWith("tenant_")) {
                    source = this.db.collection(models_1.collections.users)
                        .doc((0, modules_1.removeAllIdentifiers)(inbox.to))
                        .collection(models_1.collections.inbox);
                }
                if (!source) {
                    console.log(`The source is invalid -- ${inbox.to}`);
                    return;
                }
                yield source.doc(inbox.id).set(inbox.toMap());
            });
        }
    }
    DatabaseFunctions.Writer = Writer;
})(DatabaseFunctions = exports.DatabaseFunctions || (exports.DatabaseFunctions = {}));
//# sourceMappingURL=database.js.map