import { Sequelize } from 'sequelize'
import { PG } from '../uhuuy.json'

export class PgProvider {
  private sequelize: Sequelize

  constructor() {
    const db = PG

    this.sequelize = new Sequelize(db.NAME, db.USER, db.PASS, {
      dialect: 'postgres',
      host: db.HOST,
      port: db.PORT,
      logging: false,
      dialectOptions: {
        ssl: {
          require: db.SSLMODE === 'require',
          rejectUnauthorized: false
        }
      }
    })
  }

  connect() {
    try {
      if (this.sequelize) {
        this.sequelize.authenticate()
        // console.log('Connection has been esteblised successfully')
      } else throw new Error('Sequelize instance not initialized')
    } catch (error) {
      console.error('Unable to connect to the database: ', error)
    }
  }

  getConnection(): Sequelize {
    return this.sequelize
  }
}
