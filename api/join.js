export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, usecase } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });
  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error('Missing Supabase env vars');
    const resp = await fetch(`${url}/rest/v1/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': key, 'Authorization': `Bearer ${key}`, 'Prefer':'return=representation' },
      body: JSON.stringify({ email, usecase, source: 'landing', created_at: new Date().toISOString() })
    });
    if (!resp.ok) return res.status(500).json({ error: await resp.text() });
    res.status(200).json({ ok: true });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
}
