
// drop all collection or delete some book
// call c-use and then module->database
// call and get status from module
// return status
import assert from "assert";
import CUSE from "../c-use.js"
import { Request, Response } from "express";
import { dropBooks } from "#databases/mysql/modules/drop";

/**
 * drop/delete
 * @returns boolean
 */
export default async function (name: string, drop?: boolean): Promise<boolean> {
    const ddrop = drop || false;

    try {
        const dbUse = CUSE();
        if (dbUse === "mongo") {
            return false;
        } else if (dbUse === "mysql") {


            const result = await dropBooks();
            
            return true;
        }else{
            assert(false, "MB17");
        }
    } catch (error) {
        console.error("Error occurred:", error);
        return false;
    }
}
