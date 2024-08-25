import express, { Express, json } from 'express'
import { pgClient } from './config/database'
import { PORT } from './uhuuy.json'
import { router } from './routes'
import { morganNotes } from './config/morgan'
import { errorHandler } from './exception/exception.global'

const app: Express = express()

pgClient.connect()

app.set('trust proxy', true)
app.use(json({ type: ['application/json', 'application/csp-report', 'application/reports+json'] }))
app.use(morganNotes())
app.use(router)
app.use(errorHandler())

app.set('port', PORT)
app.listen(app.get('port'))
