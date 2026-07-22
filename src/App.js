import React, { useState } from 'react';
import SingleAdPopupDemo from './components/SingleAdPopupDemo';
import MultiAdPopupDemo from './components/MultiAdPopupDemo';
import CompleteAdDemo from './components/CompleteAdDemo';
import './styles/adStyles.css';

function App() {
  const [activeTab, setActiveTab] = useState('single');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎯 Ton-AI SDK Demo</h1>
        <p>Complete integration guide with React</p>
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