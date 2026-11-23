export default function AdminSettingsPage() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>
      <div className="rounded-2xl p-6 space-y-6" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
        <div>
          <h2 className="font-semibold text-white mb-4">Admin Account</h2>
          <div className="space-y-3 text-sm" style={{ color: '#aaa' }}>
            <p>To change your admin password or username, update the admin_users table directly in the database, or create a password-change API endpoint.</p>
            <p className="text-xs" style={{ color: '#555' }}>For security: use a strong unique password and never share your credentials.</p>
          </div>
        </div>

        <div className="pt-4 border-t" style={{ borderColor: '#2a2a2a' }}>
          <h2 className="font-semibold text-white mb-4">Environment Info</h2>
          <div className="space-y-2 text-xs font-mono" style={{ color: '#666' }}>
            <div className="flex gap-2"><span className="text-gray-500">API URL:</span> <span className="text-gray-400">{process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}</span></div>
            <div className="flex gap-2"><span className="text-gray-500">Version:</span> <span className="text-gray-400">1.0.0</span></div>
          </div>
        </div>

        <div className="pt-4 border-t" style={{ borderColor: '#2a2a2a' }}>
          <h2 className="font-semibold text-white mb-4">Seed Admin User</h2>
          <p className="text-sm mb-3" style={{ color: '#888' }}>
            To create the initial admin account, run the following command against your database with environment variables set:
          </p>
          <pre className="p-3 rounded-lg text-xs overflow-x-auto" style={{ background: '#0f0f0f', color: '#ccc' }}>
{`cd portfolio-api
DATABASE_URL=... \\
ADMIN_USERNAME=admin \\
ADMIN_EMAIL=your@email.com \\
ADMIN_PASSWORD=yourpassword \\
cargo run --bin seed-admin`}
          </pre>
        </div>
      </div>
    </div>
  );
}
