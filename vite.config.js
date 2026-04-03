import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function localProxyPlugin() {
  return {
    name: 'local-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/proxy', async (req, res) => {
        const url = new URL(req.url, 'http://localhost').searchParams.get('url')
        if (!url) {
          res.statusCode = 400
          return res.end(JSON.stringify({ error: 'Missing url parameter' }))
        }
        try {
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.5',
            },
          })
          const html = await response.text()
          if (html && html.includes('<')) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            return res.end(html)
          }
          res.statusCode = response.status
          res.end(JSON.stringify({ error: `Upstream returned ${response.status}` }))
        } catch (err) {
          res.statusCode = 502
          res.end(JSON.stringify({ error: err.message }))
        }
      })

      server.middlewares.use('/api/github-diff', async (req, res) => {
        const params = new URL(req.url, 'http://localhost').searchParams
        const owner = params.get('owner'), repo = params.get('repo'), pull = params.get('pull')
        if (!owner || !repo || !pull) {
          res.statusCode = 400
          return res.end(JSON.stringify({ error: 'Missing params' }))
        }
        try {
          const ghHeaders = { Accept: 'application/vnd.github.v3.diff', 'User-Agent': 'RoastMyPR/1.0' }
          if (process.env.GITHUB_TOKEN) ghHeaders.Authorization = `token ${process.env.GITHUB_TOKEN}`
          const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/pulls/${pull}`,
            { headers: ghHeaders }
          )
          if (!response.ok) {
            res.statusCode = response.status
            return res.end(JSON.stringify({
              error: response.status === 403
                ? 'Rate limit exceeded — try pasting the diff directly.'
                : 'Check the PR URL and try again.'
            }))
          }
          const diff = await response.text()
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(diff)
        } catch (err) {
          res.statusCode = 502
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [react(), tailwindcss(), localProxyPlugin()],
  }
})
