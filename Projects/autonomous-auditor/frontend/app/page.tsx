'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [brainStatus, setBrainStatus] = useState({ security_agent: "offline", devops_agent: "offline", scans_completed: 0 });
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [targetUrl, setTargetUrl] = useState("https://github.com/debanjan-bhuinya/DevOps-Journey");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [auditHistory, setAuditHistory] = useState<any[]>([]);

  const fetchHistory = () => {
    fetch('http://127.0.0.1:8000/api/history')
      .then(res => res.json())
      .then(data => setAuditHistory(data.history))
      .catch(err => console.error("Could not fetch history"));
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/status')
      .then(res => res.json())
      .then(data => setBrainStatus(data))
      .catch(err => console.error("Could not connect to The Brain"));
    fetchHistory();
  }, []);

  const clearDashboard = () => {
    setScanResults([]);
    setErrorMsg(null);
    setTargetUrl("");
  };

  const startAudit = async () => {
    if (!targetUrl) { setErrorMsg("Captain, please provide a target URL."); return; }
    if (!targetUrl.startsWith('http')) { setErrorMsg("Invalid URL format. Please include 'https://'."); return; }

    setIsScanning(true);
    setScanResults([]); 
    setErrorMsg(null); 
    
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/scan?repo_url=${encodeURIComponent(targetUrl)}`, { method: 'POST' });
      if (!res.ok) throw new Error("The Brain rejected the request.");
      const data = await res.json();
      setScanResults(data.results);
      setBrainStatus(prev => ({ ...prev, scans_completed: prev.scans_completed + 1 }));
      fetchHistory(); 
    } catch (error) {
      setErrorMsg("Critical Failure: Could not establish a link with The Brain.");
    }
    setIsScanning(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-10 font-sans selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-400 tracking-tight flex items-center gap-3">
              ⚡️ Autonomous Multi-Agent Auditor
            </h1>
            <p className="mt-4 text-gray-400 text-lg">
              Welcome to the flight deck, Captain Pikachu. The AI agents are standing by.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-900 p-4 rounded-xl border border-gray-800 flex gap-4 shadow-lg focus-within:border-blue-500/50 transition-colors">
          <input 
            type="text" 
            value={targetUrl}
            onChange={(e) => { setTargetUrl(e.target.value); setErrorMsg(null); }}
            placeholder="Paste standard GitHub Repository URL here..."
            className="flex-1 bg-gray-950 text-white border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
          />
          <button onClick={clearDashboard} disabled={isScanning} className="bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/50 font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50">
            Clear
          </button>
          <button onClick={startAudit} disabled={isScanning || brainStatus.security_agent === 'offline'} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2">
            {isScanning ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Scanning...
              </span>
            ) : '🚀 Launch Audit'}
          </button>
        </div>

        {errorMsg && (
          <div className="mt-6 bg-red-950/50 border border-red-900/50 text-red-400 px-6 py-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <span className="text-xl">⚠️</span><p className="font-mono text-sm">{errorMsg}</p>
          </div>
        )}
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg relative overflow-hidden group">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">🛡️ Security Agent</h2>
            <p className={`mt-2 text-sm font-bold flex items-center gap-2 ${brainStatus.security_agent === 'online' ? 'text-green-500' : 'text-red-500'}`}>
              <span className={`w-2 h-2 rounded-full ${brainStatus.security_agent === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              {brainStatus.security_agent.toUpperCase()}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg relative overflow-hidden group">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">⚙️ DevOps Agent</h2>
            <p className={`mt-2 text-sm font-bold flex items-center gap-2 ${brainStatus.devops_agent === 'online' ? 'text-green-500' : 'text-red-500'}`}>
               <span className={`w-2 h-2 rounded-full ${brainStatus.devops_agent === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              {brainStatus.devops_agent.toUpperCase()}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">📊 Audit Reports</h2>
            <p className="text-gray-400 mt-2 text-sm font-mono">{auditHistory.length} Scans in Database</p>
          </div>
        </div>

        {scanResults.length > 0 && (
          <div className="mt-10 space-y-6">
            {scanResults.map((result, index) => (
              <div key={index} className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-xl shadow-2xl font-mono overflow-x-auto animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
                    <h2 className="text-lg text-blue-400 flex items-center gap-2">
                        <span className="text-gray-500">&gt;_</span> {result.agent.toUpperCase()} (LIVE SCAN)
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${result.vulnerabilities === 0 ? 'bg-green-950/50 text-green-400' : 'bg-red-950/50 text-red-400'}`}>
                        {result.vulnerabilities} ISSUES
                    </span>
                </div>
                <div className="text-gray-300 space-y-3">
                  <p className="text-sm truncate"><span className="text-gray-500">TARGET //</span> {result.target}</p>
                  <pre className={`mt-4 p-5 rounded-lg border-l-2 whitespace-pre-wrap overflow-x-auto text-sm leading-relaxed ${result.vulnerabilities === 0 ? 'bg-green-950/20 border-green-500 text-green-300' : 'bg-red-950/20 border-red-500 text-gray-300'}`}>
                    {result.report}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {auditHistory.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-800">
            {/* THE NEW UPGRADE: Download CSV Button Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                   🗄️ Mission Archives
                </h2>
                <a 
                  href="http://127.0.0.1:8000/api/export" 
                  download 
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold border border-gray-700 transition-all flex items-center gap-2"
                >
                  📥 Export CSV
                </a>
            </div>
            
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-lg">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-gray-950/50 text-gray-300 font-mono text-xs uppercase border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Agent</th>
                    <th className="px-6 py-4">Target</th>
                    <th className="px-6 py-4 text-center">Issues</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 font-mono">
                  {auditHistory.map((record, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(record.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4 text-blue-400">{record.agent.split(' ')[0]}</td>
                      <td className="px-6 py-4 truncate max-w-[200px]" title={record.target}>{record.target.split('/').pop()}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${record.issues_found === 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                          {record.issues_found}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
