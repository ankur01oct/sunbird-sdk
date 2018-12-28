export interface KeyValueService  {

    set(key:string,value:string): Promise<any>;

    get(key:string): Promise<string>;
}
