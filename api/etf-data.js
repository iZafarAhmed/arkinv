export default async function handler(req, res) {
  // 🔒 CRITICAL: Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const { etfs } = req.body;
    if (!etfs || !Array.isArray(etfs)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    // ✅ PROCESS YOUR DATA HERE (save to DB, etc.)
    console.log(`Received ${etfs.length} ETFs:`, etfs.map(e => e.symbol));

    return res.status(200).json({ 
      success: true,
      received: etfs.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Processing error:', error);
    return res.status(500).json({ error: 'Server processing failed' });
  }
}
