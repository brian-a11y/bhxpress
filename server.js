// server.js
const http = require('http');
const next = require('next');
const ngrok = require('ngrok'); // Add ngrok

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  server.listen(PORT, '0.0.0.0', async () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);

    // Start ngrok tunnel
    try {
      const url = await ngrok.connect({
        addr: PORT,
        authtoken: process.env.NGROK_AUTHTOKEN, // optional, set in .env
      });
      console.log(`🌍 Public ngrok URL: ${url}`);
    } catch (err) {
      console.error('❌ Failed to start ngrok:', err);
    }
  });
});
