const bcrypt = require('bcryptjs');
const { supabase, cors, signToken, send } = require('./_lib/common');

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });

  const { name, username, password, confirmPassword } = req.body || {};

  if (!name || !username || !password || !confirmPassword)
    return send(res, 400, { error: 'All fields are required' });
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username))
    return send(res, 400, { error: 'Username must be 3-20 characters (letters, numbers, underscore)' });
  if (password.length < 6)
    return send(res, 400, { error: 'Password must be at least 6 characters' });
  if (password !== confirmPassword)
    return send(res, 400, { error: 'Passwords do not match' });

  const uname = username.toLowerCase();

  const { data: existing } = await supabase
    .from('users').select('id').eq('username', uname).maybeSingle();
  if (existing) return send(res, 409, { error: 'Username already taken' });

  const password_hash = await bcrypt.hash(password, 10);
  const { data: user, error } = await supabase
    .from('users')
    .insert({ name: name.trim(), username: uname, password_hash })
    .select('id, name, username')
    .single();

  if (error) return send(res, 500, { error: 'Could not create user' });

  return send(res, 201, { token: signToken(user), user });
};
