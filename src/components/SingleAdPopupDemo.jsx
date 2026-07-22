import React, { useState } from 'react';
import useTonAds from '../hooks/useTonAds';

const SingleAdPopupDemo = () => {
  const [rewardCount, setRewardCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { showRewardedAd, error } = useTonAds();

  const handleShowAd = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const ad = await showRewardedAd();
      setRewardCount(prev => prev + 1);
      setMessage(`🎉 Reward granted! You earned 10 coins from ad: ${ad.adId}`);
      console.log('✅ Reward granted:', ad);
    } catch (err) {
      setMessage(`❌ Error: ${err.message || 'Failed to show ad'}`);
      console.error('❌ Ad error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ad-demo-container">
      <h2>🎯 Rewarded Ad (Single Popup)</h2>
      
      <div className="stats-card">
        <p className="stats-label">Total Rewards Earned</p>
        <p className="stats-value">{rewardCount}</p>
        <p className="stats-sub">+10 coins per ad</p>
      </div>

      <button 
        className="ad-btn primary"
        onClick={handleShowAd}
        disabled={isLoading}
      >
        {isLoading ? '⏳ Loading...' : '🎬 Watch Ad & Earn'}
      </button>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      {error && (
        <div className="message error">
          ⚠️ SDK Error: {error}
        </div>
      )}

      <div className="info-box">
        <h4>ℹ️ How it works</h4>
        <ul>
          <li>Click the button to show a rewarded ad</li>
          <li>Watch or interact with the ad</li>
          <li>Earn coins automatically on completion</li>
          <li>No preloading required - instant popup</li>
        </ul>
      </div>
    </div>
  );
};

export default SingleAdPopupDemo;