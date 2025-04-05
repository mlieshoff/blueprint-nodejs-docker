import { KeyValue, IKeyValuesService } from "../domain/keyvalue";

export type IKeyValues = {
    getAll: (limit: number, offset: number) => Promise<KeyValue[]>;
};

export class KeyValues implements IKeyValues {

    constructor(private readonly service: IKeyValuesService) {}

    async getAll(limit: number, offset: number) {
        return await this.service.getAll(limit, offset);
    }

}