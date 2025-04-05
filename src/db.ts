import postgres from 'postgres'

const sql = postgres({
    host: process.env.POSTGRES_DB_HOST || 'localhost',
    user: process.env.POSTGRES_USER || 'postgres',
    pass: process.env.POSTGRES_PASSWORD || 'postgres',
    db: process.env.POSTGRES_DB || 'blueprint_nodejs_docker_postgres_db',
    debug: true
})

export default sql