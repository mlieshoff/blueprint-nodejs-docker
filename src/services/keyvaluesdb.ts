import sql from "./db/db";
import { IKeyValuesService, KeyValue } from "../domain/keyvalue";

class KeyValuesDB implements IKeyValuesService {
  async getAll(limit: number, offset: number) {
    const keyValues = await sql`
    select
        id,
        key,
        value
    from key_value
  `;
    const keyValueArray: KeyValue[] = keyValues.map((row) => ({
      id: row.id,
      key: row.key,
      value: row.value,
    }));

    return keyValueArray;
  }

  public async getKeyValues() {
    const keyValues = await sql`
    select
        id,
        key,
        value
    from key_value
  `;
    return keyValues;
  }

  public async save(key: string, value: string) {
    const keyValue = await sql`
        insert into key_value
          (id, key, value)
        values
          (NEXTVAL('key_value_sequence'), ${key}, ${value})
          returning key, value
      `;
    const origin: KeyValue = {
      id: Number(keyValue.values().next().value),
      key: key,
      value: value,
    };
    return origin;
  }

  public async write2<Type extends { key: string; value: string }>(
    object: Type,
  ) {
    const keyValue = await sql`
    insert into key_value
      (id, key, value)
    values
      (NEXTVAL('key_value_sequence'), ${object.key}, ${object.value})
    returning key, value
  `;
    return keyValue;
  }
}

export default KeyValuesDB;
