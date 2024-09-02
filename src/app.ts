import express, { Express, json } from 'express'
import { pgClient } from './config/database.config'
import { PORT } from './uhuuy.json'
import { indexRouter } from './routes'
import { morganNotes } from './config/morgan.config'
import { errorHandler } from './exception/exception.global'
import { helmetHandler } from './config/helmet.config'
import { compressionHandler } from './config/compression.config'

const app: Express = express()

pgClient.connect()

app.set('trust proxy', true)
app.use(helmetHandler())
app.use(json({ type: ['application/json', 'application/csp-report', 'application/reports+json'] }))
app.use(morganNotes())
app.use(compressionHandler())
app.use(indexRouter())
app.use(errorHandler())

app.set('port', PORT)
app.listen(app.get('port'))
