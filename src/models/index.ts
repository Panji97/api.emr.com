import { pgClient } from '../config/database.config'
import { initModels } from './init-models'

const sequlize = pgClient.getConnection()
export const model = initModels(sequlize)
