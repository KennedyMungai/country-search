import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono()
	.basePath('/api')
	.get('/search', async (c) => c.json({ message: 'Sup Bitches' }, 200))

export const GET = handle(app)
