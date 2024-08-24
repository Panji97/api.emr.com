import { pgClient } from '../config/database'
import { initModels } from './init-models'

const sequlize = pgClient.getConnection()
export const model = initModels(sequlize)
