import postgres from 'postgres'
import Config from '../config/config'

const sql = postgres({
    host: Config.services.db.db_host,
    user: Config.services.db.db_user,
    pass: Config.services.db.db_password,
    db: Config.services.db.db_name,
    debug: true
})

export default sql