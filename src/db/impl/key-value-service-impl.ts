import { InsertQuery, ReadQuery, UpdateQuery } from './../def/query';
import { ServiceImpl } from './service-impl';
import { KeyValueService } from './../def/key-value-service';
import {Service as DbService} from '../def/service';
import {ServiceImpl as DbServiceImpl} from './service-impl';
import { DbConfig } from '../def/db.config';

export class KeyValueServiceImpl implements KeyValueService {

    private dbService: DbService;
    private initialized: boolean = false;
    constructor(dbConfig: DbConfig) {
        this.dbService = new ServiceImpl(dbConfig);
    }
    
    static readonly TABLE_NAME = "no_sql";
    async set(key: string, value: string): Promise<any> {
        const obj = {};
        obj[key] = value;
        const insertQuery:InsertQuery = {
            table: KeyValueServiceImpl.TABLE_NAME,
            modelJson:JSON.stringify(obj)
        }

        
        let readRes = await this.get(key)
        if(readRes){
            let updateQuery:UpdateQuery={
                table: KeyValueServiceImpl.TABLE_NAME,
                selection:key,
                modelJson:JSON.stringify(obj)
            }
            let result = await this.dbService.update(updateQuery);
            return result;
        }
        else{
        let result = await this.dbService.insert(insertQuery);
        return result;
        }
    }    
    
    async get(key: string): Promise<any> {
        const readQuery:ReadQuery={
            table: KeyValueServiceImpl.TABLE_NAME,
            selection:key
        }
        let result = await this.dbService.read(readQuery);
        return result;
    }


}