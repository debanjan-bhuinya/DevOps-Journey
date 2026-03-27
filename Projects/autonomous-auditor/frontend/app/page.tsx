'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [brainStatus, setBrainStatus] = useState({ security_agent: "offline", devops_agent: "offline", scans_completed: 0 });
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any[]>([]); // NEW: Array to hold multiple reports!
  const [targetUrl, setTargetUrl] = useState("https://raw.githubusercontent.com/debanjan-bhuinya/DevOps-Journey/main/vulnerable.py");

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/status')
      .then(res => res.json())
      .then(data => setBrainStatus(data))
      .catch(err => console.error("Could not connect to The Brain"));
  }, []);

  const startAudit = async () => {
    if (!targetUrl) return;
    setIsScanning(true);
    setScanResults([]); // Clear old results
    
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/scan?repo_url=${encodeURIComponent(targetUrl)}`, {
        method: 'POST',
      });
      const data = await res.json();
      
      setScanResults(data.results); // Save ALL reports from the Brain
      setBrainStatus(prev => ({ ...prev, scans_completed: prev.scans_completed + 1 }));
    } catch (error) {
      console.error("Scan failed");
    }
    setIsScanning(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-400 tracking-tight">
              ⚡️ Autonomous Multi-Agent Auditor
            </h1>
            <p className="mt-4 text-gray-400 text-lg">
              Welcome to the flight deck, Captain Pikachu. The AI agents are standing by.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-900 p-4 rounded-xl border border-gray-800 flex gap-4 shadow-lg">
          <input 
            type="text" 
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="Paste raw GitHub file URL here..."
            className="flex-1 bg-gray-950 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button 
            onClick={startAudit}
            disabled={isScanning || brainStatus.security_agent === 'offline'}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg disabled:opacity-50 transition-all whitespace-nowrap"
          >
            {isScanning ? '🔄 Agents Scanning...' : '🚀 Launch Audit'}
          </button>
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-white">🛡️ Security Agent</h2>
            <p className={`mt-2 text-sm font-bold ${brainStatus.security_agent === 'online' ? 'text-green-500' : 'text-red-500'}`}>
              Status: {brainStatus.security_agent.toUpperCase()}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-white">⚙️ DevOps Agent</h2>
            <p className={`mt-2 text-sm font-bold ${brainStatus.devops_agent === 'online' ? 'text-green-500' : 'text-red-500'}`}>
              Status: {brainStatus.devops_agent.toUpperCase()}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-white">📊 Audit Reports</h2>
            <p className="text-gray-400 mt-2 text-sm">{brainStatus.scans_completed} Scans Completed</p>
          </div>
        </div>

        {/* NEW: Map through ALL results and display multiple terminals! */}
        {scanResults.length > 0 && (
          <div className="mt-10 space-y-6">
            {scanResults.map((result, index) => (
              <div key={index} className="bg-black border border-gray-800 p-6 rounded-xl shadow-2xl font-mono overflow-x-auto">
                <h2 className="text-xl text-green-400 mb-4">&gt;_ {result.agent.toUpperCase()} REPORT INCOMING...</h2>
                <div className="text-gray-300 space-y-2">
                  <p><span className="text-blue-400">Target:</span> {result.target}</p>
                  <p><span className="text-blue-400">Issues Found:</span> {result.vulnerabilities}</p>
                  <p className={`mt-4 p-4 rounded ${result.vulnerabilities === 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {result.report}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
