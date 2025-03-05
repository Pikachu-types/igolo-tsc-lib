import * as admin from "firebase-admin";
import { Collections, ConnectMyBankDto, LeaseDto, OrganisationDto, PropertyDto } from "../models";
import { UnitDto } from "../models/dto/unit";
import { InboxDto } from '../models/dto/inbox';
export declare namespace DatabaseFunctions {
    /**
    * Database helper class
    */
    class Getters {
        readonly db: admin.firestore.Firestore;
        constructor(admin: admin.firestore.Firestore);
        /**
          * Go to database said collection and get all
          * @return {Promise<LeaseDto[]>} returns list.
          */
        getLeases(): Promise<LeaseDto[]>;
        /**
         * Retrieves bank connect processes for a given ID.
         *
         * @param id - The unique identifier for the bank connect process.
         * @returns {Promise<ConnectMyBankDto?>} A promise that resolves to an array of ConnectMyBankDto objects.
         */
        getBankConnectProcesses({ id, reference }: {
            id?: string;
            reference?: string;
        }): Promise<ConnectMyBankDto | undefined>;
        getProperty(id: string): Promise<PropertyDto>;
        getOrganisation(id: string): Promise<OrganisationDto>;
        getUnit(id: string): Promise<UnitDto>;
        getDocument({ id, collection }: {
            id: string;
            collection: Collections;
        }): Promise<Record<string, unknown> | undefined>;
    }
    /**
    * Database helper class
    */
    class Writer {
        readonly db: admin.firestore.Firestore;
        constructor(admin: admin.firestore.Firestore);
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
        manageDocument({ data, id, setter, collection }: {
            data: Record<string, unknown>;
            id: string;
            setter: boolean;
            collection: Collections;
        }): Promise<void>;
        createInbox(inbox: InboxDto): Promise<void>;
    }
}
