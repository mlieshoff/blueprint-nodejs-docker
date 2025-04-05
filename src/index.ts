import Fastify from 'fastify'
import sql from './db'
import KeyValues from './keyvalues'
import keyvalues from "./keyvalues";

const fastify = Fastify({logger: true});

const keyValues = new KeyValues();

fastify.get('/', async (request, reply) => {
    fastify.log.info('Incoming request at /');
    console.log('user= ' + sql.options.user)
    await keyValues.insertKeyValue({key : sql.options.user, value: new Date().toISOString()})
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