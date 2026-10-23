const bcrypt = require('bcryptjs');
const { supabase, cors, signToken, send } = require('./_lib/common');

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });

  const { username, password } = req.body || {};
  if (!username || !password)
    return send(res, 400, { error: 'Username and password are required' });

  const { data: user } = await supabase
    .from('users')
    .select('id, name, username, password_hash')
    .eq('username', username.toLowerCase())
    .maybeSingle();

  const ok = user && (await bcrypt.compare(password, user.password_hash));
  if (!ok) return send(res, 401, { error: 'Invalid username or password' });

  const safe = { id: user.id, name: user.name, username: user.username };
  return send(res, 200, { token: signToken(safe), user: safe });
};
