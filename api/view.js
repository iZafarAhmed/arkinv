export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET requests allowed' });
  }

  res.status(200).json({
    message: "This endpoint only receives data via POST from the Chrome extension.",
    instructions: "To see logs of received data, go to Vercel Dashboard → Functions → /api/etf-data → Logs"
  });
}
