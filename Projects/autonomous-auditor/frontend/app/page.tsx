'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [brainStatus, setBrainStatus] = useState({ security_agent: "offline", devops_agent: "offline", scans_completed: 0 });
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [targetUrl, setTargetUrl] = useState("https://raw.githubusercontent.com/debanjan-bhuinya/DevOps-Journey/main/Dockerfile");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/status')
      .then(res => res.json())
      .then(data => setBrainStatus(data))
      .catch(err => console.error("Could not connect to The Brain"));
  }, []);

  const clearDashboard = () => {
    setScanResults([]);
    setErrorMsg(null);
    setTargetUrl("");
  };

  const startAudit = async () => {
    if (!targetUrl) {
        setErrorMsg("Captain, please provide a target URL.");
        return;
    }
    if (!targetUrl.startsWith('http')) {
        setErrorMsg("Invalid URL format. Please include 'https://'.");
        return;
    }

    setIsScanning(true);
    setScanResults([]); 
    setErrorMsg(null); 
    
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/scan?repo_url=${encodeURIComponent(targetUrl)}`, { method: 'POST' });
      if (!res.ok) throw new Error("The Brain rejected the request.");
      const data = await res.json();
      setScanResults(data.results);
      setBrainStatus(prev => ({ ...prev, scans_completed: prev.scans_completed + 1 }));
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
            placeholder="Paste raw GitHub file URL here..."
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
            <p className="text-gray-400 mt-2 text-sm font-mono">{brainStatus.scans_completed} Scans Completed</p>
          </div>
        </div>

        {scanResults.length > 0 && (
          <div className="mt-10 space-y-6">
            {scanResults.map((result, index) => (
              <div key={index} className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-xl shadow-2xl font-mono overflow-x-auto animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}>
                <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
                    <h2 className="text-lg text-blue-400 flex items-center gap-2">
                        <span className="text-gray-500">&gt;_</span> {result.agent.toUpperCase()}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${result.vulnerabilities === 0 ? 'bg-green-950/50 text-green-400 border border-green-900/50' : 'bg-red-950/50 text-red-400 border border-red-900/50'}`}>
                        {result.vulnerabilities} ISSUES DETECTED
                    </span>
                </div>
                <div className="text-gray-300 space-y-3">
                  <p className="text-sm truncate"><span className="text-gray-500">TARGET //</span> {result.target}</p>
                  
                  {/* THE UI UPGRADE: Render text with line breaks and monospace formatting! */}
                  <pre className={`mt-4 p-5 rounded-lg border-l-2 whitespace-pre-wrap overflow-x-auto text-sm leading-relaxed ${result.vulnerabilities === 0 ? 'bg-green-950/20 border-green-500 text-green-300' : 'bg-red-950/20 border-red-500 text-gray-300'}`}>
                    {result.report}
                  </pre>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
