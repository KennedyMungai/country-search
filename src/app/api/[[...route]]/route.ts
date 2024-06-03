import { Redis } from '@upstash/redis'
import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { handle } from 'hono/vercel'

type EnvConfig = {
	UPSTASH_REDIS_REST_TOKEN: string
	UPSTASH_REDIS_REST_URL: string
}

export const runtime = 'edge'

const app = new Hono().basePath('/api').get('/search', async (c) => {
	try {
		const { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } =
			env<EnvConfig>(c)

		// #region Query Performance
		const start = performance.now()

		const redis = new Redis({
			token: UPSTASH_REDIS_REST_TOKEN,
			url: UPSTASH_REDIS_REST_URL
		})

		const query = c.req.query('q')?.toUpperCase()

		if (!query) return c.json({ message: 'Invalid search query' }, 400)

		const res = []

		const rank = await redis.zrank('terms', query)

		if (rank !== null && rank !== undefined) {
			const temp = await redis.zrange<string[]>('terms', rank, rank + 100)

			for (const el of temp) {
				if (!el.startsWith(query)) break

				if (el.endsWith('*')) res.push(el.substring(0, el.length - 1))
			}
		}

		const end = performance.now()

		// #endregion Query Performance

		return c.json({ results: res, duration: end - start }, 200)
	} catch (error: any) {
		console.error(error.message)

		return c.json({ results: [], message: 'Something went wrong' }, 500)
	}
})

export const GET = handle(app)
