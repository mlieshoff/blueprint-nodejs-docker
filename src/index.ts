import Fastify from 'fastify'
import sql from './db/db'
import KeyValues from './service/keyvalues'
import Files from "./files/files";

const fastify = Fastify({logger: true});

const keyValues = new KeyValues();

const fileService = new Files();

fastify.get('/', async (request, reply) => {
    fastify.log.info('Incoming request at /');
    const key = sql.options.user;
    const value = new Date().toISOString();
    await fileService.write(key + "-" + value + ".txt", value)
    await keyValues.insertKeyValue({key : key, value: value})
    const results = await keyValues.getKeyValues();
    return 'Hello there! 👋\n' + JSON.stringify(results);
})

const start = async () => {
    try {
        await fastify.listen({ port: 8080, host: '0.0.0.0' });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

start();