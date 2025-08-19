import * as admin from "firebase-admin";
import {
  Collections, collections, ConnectMyBankDto,
  LeaseDto, OrganisationDto, PropertyDto, WebhookRetry
} from "../models";
import { CustomError, parseInterface, unixTimeStampNow } from "labs-sharable";
import { UnitDto } from "../models/dto/unit";
import { InboxDto } from '../models/dto/inbox';
import { removeAllIdentifiers } from "../modules";
import { Http } from "./http";

export namespace DatabaseFunctions { 

  /**
  * Database helper class
  */
  export class Getters {

    readonly db: admin.firestore.Firestore;

    constructor(admin: admin.firestore.Firestore) {
      this.db = admin;
    }


    /**
      * Go to database said collection and get all
      * @return {Promise<LeaseDto[]>} returns list.
      */
    public async getLeases(): Promise<LeaseDto[]> {
      const source = await this.db.collection(collections.leases).get();
      return source.docs.map((e) => LeaseDto.fromJson(e.data()));
    }

    /**
     * Retrieves bank connect processes for a given ID.
     * 
     * @param id - The unique identifier for the bank connect process.
     * @returns {Promise<ConnectMyBankDto?>} A promise that resolves to an array of ConnectMyBankDto objects.
     */
    public async getBankConnectProcesses({ id, reference }: {
      id?: string, reference?: string
    }): Promise<ConnectMyBankDto | undefined> {
      let source;
      if (id) {
        source = await this.db.collection(collections.bank_connect)
          .where('id', '==', id)
          .get()
      } else if (reference) {
        source = await this.db.collection(collections.bank_connect)
          .where('reference', '==', reference)
          .get();
        if (source.docs.length < 1) return;
        return source.docs.map((e) => ConnectMyBankDto.fromJson(e.data()))[0];
      } else {
        return;
      }
    }

    public async getProperty(id: string): Promise<PropertyDto> {
      const source = await this.db.collection(collections.properties).doc(id).get();
      if (!source.exists) throw new CustomError("No such property of id: " + id);
      return PropertyDto.fromJson(parseInterface(source.data()));
    }

    public async getOrganisation(id: string): Promise<OrganisationDto> {
      const source = await this.db.collection(collections.organizations).doc(id).get();
      if (!source.exists) throw new CustomError("No such organisation of id: " + id);
      return OrganisationDto.fromJson(parseInterface(source.data()));
    }

    public async getUnit(id: string): Promise<UnitDto> {
      const source = await this.db.collection(collections.units).doc(id).get();
      if (!source.exists) throw new CustomError("No such unit of id: " + id);
      return UnitDto.fromJson(parseInterface(source.data()));
    }

    public async getDocument({ id, collection }: {
      id: string, collection: Collections
    }): Promise<Record<string, unknown> | undefined> {
      const source = await this.db.collection(collection).doc(id)
        .get();
      if (!source.exists) return;
      return source.data();
    }

  }
  
  /**
  * Database helper class
  */
  export class Writer {

    readonly db: admin.firestore.Firestore;

    constructor(admin: admin.firestore.Firestore) {
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
    public async sendWebhookWithRetry({
      url,
      body,
      documentId,
      documentType,
    }: {
      url: string;
      body: any;
      documentId: string;
      documentType: WebhookRetry["documentType"];
    }): Promise<boolean> {
      try {
        await Http.post({ url, body });
        return true;
      } catch (error) {
        console.error(`Webhook failed for ${documentId}. Error:`, error);
        // Save failed webhook for retry
        const retry: WebhookRetry = {
          id: this.db.collection(collections.webhookRetries).doc().id,
          url,
          body,
          documentId,
          documentType,
          createdAt: unixTimeStampNow(),
          lastAttempt: unixTimeStampNow(),
          attempts: 1,
          maxAttempts: 5,
        };
        await this.db.collection(collections.webhookRetries).doc(retry.id).set(retry);
        return false;
      }
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
    public async manageDocument({ data, id, setter = false, collection }: {
      data: Record<string, unknown>, id: string, setter: boolean, collection: Collections
    })
      : Promise<void> {
      const query = this.db.
        collection(collection).doc(id);
      if (setter) {
        await query.set(data);
      } else {
        await query.update(data);
      }
    }

    public async createInbox(inbox: InboxDto): Promise<void> {
      let source;
      if (inbox.to.startsWith("org_")) {
        source = this.db.collection(collections.organizations)
          .doc((inbox.to))
          .collection(collections.inbox);
      } else if (inbox.to.startsWith("tenant_")) {
        source = this.db.collection(collections.users)
          .doc(removeAllIdentifiers(inbox.to))
          .collection(collections.inbox);
      }
      if (!source) {
        console.log(`The source is invalid -- ${inbox.to}`);
        return;
      }
      await source.doc(inbox.id).set(inbox.toMap());
    }
  }
}