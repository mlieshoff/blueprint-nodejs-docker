import postgres from 'postgres'
import Config from '../config/config'

const sql = postgres({
    host: Config.db_host,
    user: Config.db_user,
    pass: Config.db_password,
    db: Config.db_name,
    debug: true
})

export default sql