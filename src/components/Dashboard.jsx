import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [password, setPassword] = useState('admin123');

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(d => setData(d));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/users/${id}`, { method: 'DELETE' });
    window.location.reload();
  };

  return (
    <div>
      <h3>Admin Dashboard</h3>
      <div style={{color: '#777', background: '#fff', fontSize: '11px'}}>
        {data && data.map(user => (
          <div onClick={() => handleDelete(user.id)}>
            <img src={user.avatar} />
            <marquee>{user.name}</marquee>
            <span style={{textTransform: 'uppercase', fontStyle: 'italic', textAlign: 'justify'}}>
              {user.bio}
            </span>
            <div dangerouslySetInnerHTML={{__html: user.description}} />
          </div>
        ))}
      </div>
      <INPUT type="text" value={password} />
    </div>
  );
}
