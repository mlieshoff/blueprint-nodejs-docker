import sql from './db'

class KeyValues {

    public async getKeyValues() {
        const keyValues = await sql`
    select
        id,
        key,
        value
    from key_value
  `
        return keyValues
    }

    public async insertKeyValue<Type extends {key: string, value: string}>(object: Type) {
        const keyValue = await sql`
    insert into key_value
      (id, key, value)
    values
      (NEXTVAL('key_value_sequence'), ${ object.key }, ${ object.value })
    returning key, value
  `
        return keyValue
    }
}

export default KeyValues;
