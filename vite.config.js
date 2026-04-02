import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function proxyPlugin() {
  return {
    name: 'page-source-proxy',
    configureServer(server) {
      server.middlewares.use('/api/proxy', async (req, res) => {
        const url = new URL(req.url, 'http://localhost').searchParams.get('url')
        if (!url) {
          res.statusCode = 400
          res.end(JSON.stringify({ error: 'Missing url parameter' }))
          return
        }

        try {
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.5',
            },
          })

          if (!response.ok) {
            res.statusCode = response.status
            res.end(JSON.stringify({ error: `Upstream returned ${response.status}` }))
            return
          }

          const html = await response.text()
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(html)
        } catch (err) {
          res.statusCode = 502
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), proxyPlugin()],
})
