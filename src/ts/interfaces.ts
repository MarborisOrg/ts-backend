/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license MIT
 * @description This module defines TypeScript namespaces for application configuration and MongoDB document types.
 * It includes types for application settings, environment configuration, and MongoDB user and item documents.
 */

import { Document } from 'mongoose';

export namespace mongo_ns {
  /**
   * Type definition for a user document in MongoDB.
   */
  export type IUser = {
    readonly [x: string]: any; // Allow additional properties
    readonly name: string; // User's name
    readonly email: string; // User's email
    readonly ownedItems: ReadonlyArray<string>; // List of owned item IDs
  } & Document;

  /**
   * Type definition for an item document in MongoDB.
   */
  export type IItem = {
    readonly [x: string]: any; // Allow additional properties
    readonly title: string; // Title of the item
    readonly description: string; // Description of the item
    readonly owners: ReadonlyArray<string>; // List of owner IDs
    id: number; // Unique identifier for the item
  } & Document;

  /**
   * Type definition for ownership records in MongoDB.
   */
  export type IOwnership = {
    readonly [x: string]: any; // Allow additional properties
    readonly user: string; // User ID of the owner
    readonly item: string; // Item ID of the owned item
    readonly createdAt: Date; // Date when the ownership was created
  } & Document;
}
