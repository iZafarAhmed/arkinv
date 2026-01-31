// Global variable to hold latest data (resets on server restart - perfect for quick viewing)
let latestData = { message: "Send data from Chrome extension first" };

export default function handler(req, res) {
  // Allow browser access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  // ✅ POST: Save data when extension sends it
  if (req.method === 'POST') {
    latestData = {
      receivedAt: new Date().toISOString(),
      ...req.body
    };
    console.log('✅ Data saved:', latestData);
    return res.status(200).json({ success: true });
  }
  
  // ✅ GET: Show saved data in browser
  if (req.method === 'GET') {
    return res.status(200).json(latestData);
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}
