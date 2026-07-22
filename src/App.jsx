import React, { useState, useEffect } from 'react';
// ✅ Import TonAdInit
import { TonAdInit } from 'ton-ai-sdk';
import SingleAdPopupDemo from './components/SingleAdPopupDemo';
import MultiAdPopupDemo from './components/MultiAdPopupDemo';
import CompleteAdDemo from './components/CompleteAdDemo';
import './styles/adStyles.css';

function App() {
  const [activeTab, setActiveTab] = useState('single');
  const [sdkStatus, setSdkStatus] = useState('initializing');

  // ✅ Initialize SDK in useEffect (exactly as documentation)
  useEffect(() => {
    console.log('🔄 Initializing Ton-AI SDK...');
    
    try {
      // Set debug=true during testing to receive test ads
      const result = TonAdInit({ 
        appId: '6a3d6f1f003774752752430b', // ← REPLACE with your actual App ID
        debug: false 
      });
      
      console.log('📦 TonAdInit Result:', result);
      
      if (result && result.success !== false) {
        setSdkStatus('ready');
        console.log('✅ SDK initialized successfully!');
      } else {
        setSdkStatus('error');
        console.error('❌ SDK initialization failed:', result);
      }
    } catch (err) {
      setSdkStatus('error');
      console.error('❌ SDK initialization error:', err);
    }
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎯 Ton-AI SDK Demo</h1>
        <p>Complete integration guide with React</p>
        {sdkStatus === 'ready' && (
          <span style={{color: '#4CAF50', fontSize: '0.9rem', display: 'block', marginTop: '5px'}}>
            ✅ SDK Ready
          </span>
        )}
        {sdkStatus === 'initializing' && (
          <span style={{color: '#ffc107', fontSize: '0.9rem', display: 'block', marginTop: '5px'}}>
            ⏳ Initializing SDK...
          </span>
        )}
        {sdkStatus === 'error' && (
          <span style={{color: '#f44336', fontSize: '0.9rem', display: 'block', marginTop: '5px'}}>
            ❌ SDK Error - Check Console
          </span>
        )}
      </header>

      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'single' ? 'active' : ''}`}
          onClick={() => setActiveTab('single')}
        >
          Single Ad Popup
        </button>
        <button 
          className={`tab-btn ${activeTab === 'multi' ? 'active' : ''}`}
          onClick={() => setActiveTab('multi')}
        >
          Multi Native Ads
        </button>
        <button 
          className={`tab-btn ${activeTab === 'complete' ? 'active' : ''}`}
          onClick={() => setActiveTab('complete')}
        >
          Complete Demo
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'single' && <SingleAdPopupDemo />}
        {activeTab === 'multi' && <MultiAdPopupDemo />}
        {activeTab === 'complete' && <CompleteAdDemo />}
      </div>

      <footer className="app-footer">
        <p>📦 Ton-AI SDK v1.0.0 | React Integration</p>
      </footer>
    </div>
  );
}

export default App;
