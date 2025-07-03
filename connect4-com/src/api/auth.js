export async function login(email, password) {
    const res = await fetch(`http://localhost:3000/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }
  return data;
}

export async function signup(email, username, password) {
    const res = await fetch(`http://localhost:3000/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Signup failed');
  }
  return data;
}

export async function logout() {
  await fetch(`http://localhost:3000/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  });
}

export async function getCurrentUser() {
  const res = await fetch(`http://localhost:3000/auth/current`, {
    credentials: 'include'
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to get user');
  }
  return data;
}