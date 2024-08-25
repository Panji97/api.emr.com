import express, { Express, json } from 'express'
import { pgClient } from './config/database'
import { PORT } from './uhuuy.json'
import { router } from './routes'
import { morganNotes } from './config/morgan'

const app: Express = express()

pgClient.connect()

app.set('trust proxt', true)
app.use(json({ type: ['application/json', 'application/csp-report', 'application/reports+json'] }))
app.use(morganNotes())
app.use(router)

app.set('port', PORT)
app.listen(app.get('port'))
