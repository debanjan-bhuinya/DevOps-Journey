'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [brainStatus, setBrainStatus] = useState({ security_agent: "offline", devops_agent: "offline", scans_completed: 0 });
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  // 1. Wake up and check status
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/status')
      .then(res => res.json())
      .then(data => setBrainStatus(data))
      .catch(err => console.error("Could not connect to The Brain"));
  }, []);

  // 2. The function that dispatches the AI Agent
  const startAudit = async () => {
    setIsScanning(true);
    setScanResult(null); // Clear old results
    
    try {
      // Call the Brain's API exactly like Swagger did!
      const res = await fetch('http://127.0.0.1:8000/api/scan?repo_url=https://github.com/debanjan-bhuinya/DevOps-Journey', {
        method: 'POST',
      });
      const data = await res.json();
      
      // Save the report to show on screen
      setScanResult(data.results[0]);
      
      // Bump the scan counter
      setBrainStatus(prev => ({ ...prev, scans_completed: prev.scans_completed + 1 }));
    } catch (error) {
      console.error("Scan failed");
    }
    setIsScanning(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-blue-400 tracking-tight">
              ⚡️ Autonomous Multi-Agent Auditor
            </h1>
            <p className="mt-4 text-gray-400 text-lg">
              Welcome to the flight deck, Captain Pikachu. The AI agents are standing by.
            </p>
          </div>
          
          {/* THE NEW DEPLOY BUTTON */}
          <button 
            onClick={startAudit}
            disabled={isScanning || brainStatus.security_agent === 'offline'}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg disabled:opacity-50 transition-all"
          >
            {isScanning ? '🔄 Agents Scanning...' : '🚀 Launch Audit Mission'}
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

        {/* THE MISSION REPORT TERMINAL */}
        {scanResult && (
          <div className="mt-10 bg-black border border-gray-800 p-6 rounded-xl shadow-2xl font-mono">
            <h2 className="text-xl text-green-400 mb-4">&gt;_ MISSION REPORT INCOMING...</h2>
            <div className="text-gray-300 space-y-2">
              <p><span className="text-blue-400">Agent:</span> {scanResult.agent}</p>
              <p><span className="text-blue-400">Target:</span> {scanResult.target}</p>
              <p><span className="text-blue-400">Vulnerabilities Found:</span> {scanResult.vulnerabilities}</p>
              <p className={`mt-4 p-4 rounded ${scanResult.vulnerabilities === 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {scanResult.report}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
