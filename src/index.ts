import Fastify from 'fastify'

const fastify = Fastify({logger: true});

fastify.get('/', async (request, reply) => {
    fastify.log.info('Incoming request at /');
    return 'Hello there! 👋';
})

const start = async () => {
    try {
        await fastify.listen({ port: 8080 });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

start();