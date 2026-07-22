import React, { useState, useEffect } from 'react';
import useTonAds from '../hooks/useTonAds';

const CompleteAdDemo = () => {
  const [coins, setCoins] = useState(100);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState('');
  
  const { 
    ads, 
    loading, 
    fetchAds, 
    showRewardedAd, 
    showNativeAd 
  } = useTonAds();

  useEffect(() => {
    fetchAds(3);
  }, [fetchAds]);

  const handleRewardedAd = async () => {
    try {
      const ad = await showRewardedAd();
      setCoins(prev => prev + 25);
      setMessage(`🎉 +25 coins from rewarded ad!`);
      if (coins >= 200) {
        setLevel(prev => prev + 1);
        setMessage(`⭐ Level Up! You're now level ${level + 1}`);
      }
      console.log('✅ Rewarded ad completed:', ad);
    } catch (error) {
      setMessage(`❌ Error: ${error.message || 'Ad failed'}`);
      console.error('❌ Rewarded ad error:', error);
    }
  };

  const handleNativeAd = async (ad) => {
    try {
      const clickedAd = await showNativeAd(ad);
      setCoins(prev => prev + 15);
      setMessage(`🎯 +15 coins from native ad!`);
      console.log('✅ Native ad completed:', clickedAd);
    } catch (error) {
      setMessage(`❌ Error: ${error.message || 'Native ad failed'}`);
      console.error('❌ Native ad error:', error);
    }
  };

  return (
    <div className="complete-demo">
      <div className="game-header">
        <div className="game-stats">
          <div className="stat">
            <span className="stat-icon">🪙</span>
            <span className="stat-value">{coins}</span>
            <span className="stat-label">Coins</span>
          </div>
          <div className="stat">
            <span className="stat-icon">⭐</span>
            <span className="stat-value">{level}</span>
            <span className="stat-label">Level</span>
          </div>
          <div className="stat">
            <span className="stat-icon">📱</span>
            <span className="stat-value">{ads.length}</span>
            <span className="stat-label">Ads</span>
          </div>
        </div>
      </div>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="game-actions">
        <button 
          className="ad-btn primary large"
          onClick={handleRewardedAd}
        >
          🎬 Watch Rewarded Ad (+25 coins)
        </button>
      </div>

      <div className="native-ads-section">
        <h3>Sponsored Content</h3>
        <div className="native-grid">
          {loading ? (
            <div className="loading-skeleton">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-text"></div>
                </div>
              ))}
            </div>
          ) : (
            ads.map((ad) => (
              <div
                key={ad.adId}
                className="native-card"
                onClick={() => handleNativeAd(ad)}
              >
                {ad.imageUrl && (
                  <img src={ad.imageUrl} alt={ad.text} />
                )}
                <div className="native-card-content">
                  <h4>{ad.text || 'Sponsored'}</h4>
                  <p>{ad.description || 'Watch to earn rewards'}</p>
                  <span className="reward-badge">+15 coins</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="game-progress">
        <h4>Progress to Next Level</h4>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(coins % 200) / 2}%` }}
          ></div>
        </div>
        <p>{200 - (coins % 200)} coins needed for next level</p>
      </div>
    </div>
  );
};

export default CompleteAdDemo;