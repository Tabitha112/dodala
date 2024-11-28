import { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ username, password, role });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1em', textAlign: 'center' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1em' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '0.5em' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1em' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '0.5em' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1em' }}>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ width: '100%', padding: '0.5em' }}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" style={{ padding: '0.5em 1em', cursor: 'pointer' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
