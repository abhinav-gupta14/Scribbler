# ScriBBler Backend (Vercel + Supabase)

## Endpoints
| Method | Path | Auth | Body |
|---|---|---|---|
| POST | /api/signup | no | `{ name, username, password, confirmPassword }` |
| POST | /api/signin | no | `{ username, password }` |
| GET  | /api/posts  | no | – |
| POST | /api/posts  | `Authorization: Bearer <token>` | `{ title, contents }` |

Signup/signin return `{ token, user }`.

## Setup
1. **Supabase**: create a project -> SQL Editor -> paste & run `supabase/schema.sql`.
2. **Keys**: Project Settings -> API -> copy the Project URL and the `service_role` key.
3. **Push to GitHub** (this folder as its own repo).
4. **Vercel**: Add New Project -> import the repo -> add environment variables from `.env.example`
   (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, `ALLOWED_ORIGIN`) -> Deploy.
5. Your API is live at `https://<your-project>.vercel.app/api/...`

## Local testing
```
npm i -g vercel
npm install
cp .env.example .env.local   # fill in values
vercel dev
```

## Connecting the frontend
```js
const API = 'https://<your-project>.vercel.app/api';

async function signUp(name, username, password, confirmPassword) {
  const r = await fetch(`${API}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, username, password, confirmPassword }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error);
  localStorage.setItem('token', data.token);
  return data.user;
}

async function signIn(username, password) {
  const r = await fetch(`${API}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error);
  localStorage.setItem('token', data.token);
  return data.user;
}

async function getPosts() {
  const r = await fetch(`${API}/posts`);
  return (await r.json()).posts;
}

async function createPost(title, contents) {
  const r = await fetch(`${API}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ title, contents }),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error);
  return data.post;
}
```

## Notes
- Never put `SUPABASE_SERVICE_ROLE_KEY` in frontend code.
- `ALLOWED_ORIGIN` must match your frontend origin exactly (https://abhinav-gupta14.github.io, no path).
