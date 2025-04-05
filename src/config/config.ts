const Config = {
    folder: process.env.FOLDER || "/tmp/test",
    db_host: process.env.POSTGRES_DB_HOST || 'localhost',
    db_user: process.env.POSTGRES_USER || 'postgres',
    db_password: process.env.POSTGRES_PASSWORD || 'postgres',
    db_name: process.env.POSTGRES_DB || 'blueprint_nodejs_docker_postgres_db',
}

export default Config