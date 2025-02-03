import * as admin from "firebase-admin";
import { Collections, collections, ConnectMyBankDto, LeaseDto, PropertyDto } from "../models";
import { CustomError, parseInterface } from "labs-sharable";
import { UnitDto } from "../models/dto/unit";
import { InboxDto } from '../models/dto/inbox';
import { removeAllIdentifiers } from "../modules";

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

    public async addBankAccount() {
      
    }

    public async createInbox(inbox: InboxDto): Promise<void> {
      let source;
      if (inbox.to.startsWith("landlord")) {
        source = this.db.collection(collections.landlords)
          .doc(removeAllIdentifiers(inbox.to))
          .collection(collections.inbox);
      } else if (inbox.to.startsWith("tenant")) {
        source = this.db.collection(collections.tenants)
          .doc(removeAllIdentifiers(inbox.to))
          .collection(collections.inbox);
      }
      if (!source) return;
      await source.doc(inbox.id).set(inbox.toMap());
    }
  }
}