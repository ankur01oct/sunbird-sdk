import { Migration,Constant } from "../../db";

export class KeyValueEntry{
    static readonly _ID = "_id";
    static readonly TABLE_NAME = "no_sql";
    static COLUMN_NAME_KEY = "key";
    static COLUMN_NAME_VALUE = "value"

    static getCreateEntry(): string {
        return "CREATE TABLE IF NOT EXISTS" + KeyValueEntry.TABLE_NAME + " (" +
            KeyValueEntry._ID + " INTEGER PRIMARY KEY," +
            KeyValueEntry.COLUMN_NAME_KEY + Constant.TEXT_TYPE + Constant.COMMA_SEP +
            KeyValueEntry.COLUMN_NAME_VALUE + Constant.TEXT_TYPE +
            " )";
    }
}
'CREATE TABLE IF NOT EXISTS no_sql (_id INTEGER PRIMARY KEY,key TEXT, value TEXT )'

export class KeyValueMigration extends Migration{
    queries(): string[] {
        return [KeyValueEntry.getCreateEntry()];
    }

}