
export type KeyValue = {
    id: number;
    key: string;
    value: string;
};

export type IKeyValuesService = {
    getAll: (limit: number, offset: number) => Promise<KeyValue[]>;
};