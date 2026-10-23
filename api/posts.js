const { supabase, cors, getUser, send } = require('./_lib/common');

module.exports = async (req, res) => {
  if (cors(req, res)) return;

  // GET /api/posts  -> all posts, newest first (public)
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, contents, created_at, users(name, username)')
      .order('created_at', { ascending: false });
    if (error) return send(res, 500, { error: 'Could not load posts' });

    const posts = data.map((p) => ({
      id: p.id,
      title: p.title,
      contents: p.contents,
      created_at: p.created_at,
      author: p.users ? { name: p.users.name, username: p.users.username } : null,
    }));
    return send(res, 200, { posts });
  }

  // POST /api/posts -> create post (login required)
  if (req.method === 'POST') {
    const user = getUser(req);
    if (!user) return send(res, 401, { error: 'Please sign in first' });

    const { title, contents } = req.body || {};
    if (!title?.trim() || !contents?.trim())
      return send(res, 400, { error: 'Title and contents are required' });

    const { data, error } = await supabase
      .from('posts')
      .insert({ user_id: user.sub, title: title.trim(), contents: contents.trim() })
      .select('id, title, contents, created_at')
      .single();
    if (error) return send(res, 500, { error: 'Could not create post' });

    return send(res, 201, { post: { ...data, author: { username: user.username } } });
  }

  return send(res, 405, { error: 'Method not allowed' });
};
