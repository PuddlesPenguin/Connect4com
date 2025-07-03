import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../api/auth';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>👤 Profile</h1>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Elo:</strong> {user.elo}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default ProfilePage;