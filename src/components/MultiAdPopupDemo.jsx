import React, { useState, useEffect } from 'react';
import useTonAds from '../hooks/useTonAds';

const MultiAdPopupDemo = () => {
  const [selectedAd, setSelectedAd] = useState(null);
  const [rewardHistory, setRewardHistory] = useState([]);
  
  const { 
    ads, 
    loading, 
    error, 
    fetchAds, 
    showNativeAd 
  } = useTonAds();

  useEffect(() => {
    console.log('🔄 MultiAdPopupDemo mounted');
    // Try to fetch ads after a small delay to ensure SDK is ready
    const timer = setTimeout(() => {
      fetchAds(5);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [fetchAds]);

  const handleAdClick = async (ad) => {
    setSelectedAd(ad.adId);
    
    try {
      const clickedAd = await showNativeAd(ad);
      setRewardHistory(prev => [
        {
          id: clickedAd.adId,
          text: clickedAd.text || 'Sponsored Ad',
          timestamp: new Date().toLocaleTimeString(),
        },
        ...prev
      ]);
      console.log('✅ Native ad reward granted:', clickedAd);
    } catch (err) {
      console.error('❌ Native ad error:', err);
      alert('Failed to show ad: ' + err.message);
    } finally {
      setSelectedAd(null);
    }
  };

  const handleRefresh = () => {
    fetchAds(5);
  };

  if (loading && ads.length === 0) {
    return (
      <div className="ad-demo-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading ads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ad-demo-container">
      <h2>📱 Native Ads (Multiple)</h2>
      
      <div className="ad-controls">
        <button className="ad-btn secondary" onClick={handleRefresh}>
          🔄 Refresh Ads
        </button>
        <span className="ad-count">{ads.length} ads available</span>
      </div>

      {error && (
        <div className="message error">
          ⚠️ {error}
        </div>
      )}

      <div className="ad-grid">
        {ads.length === 0 ? (
          <div className="empty-state">
            <p>No ads available at the moment</p>
            <p style={{fontSize: '0.9rem', color: '#666'}}>
              Make sure you have a valid Block ID
            </p>
            <button className="ad-btn secondary" onClick={handleRefresh}>
              Try Again
            </button>
          </div>
        ) : (
          ads.map((ad) => (
            <div
              key={ad.adId}
              className={`ad-card ${selectedAd === ad.adId ? 'loading' : ''}`}
              onClick={() => handleAdClick(ad)}
            >
              {ad.imageUrl && (
                <div className="ad-image">
                  <img src={ad.imageUrl} alt={ad.text} />
                </div>
              )}
              <div className="ad-content">
                <h3>{ad.text || 'Sponsored Content'}</h3>
                {ad.description && (
                  <p className="ad-description">{ad.description}</p>
                )}
                <div className="ad-actions">
                  <span className="ad-reward">🎁 +10 coins</span>
                  <span className="ad-click">Click to watch →</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {rewardHistory.length > 0 && (
        <div className="reward-history">
          <h3>📜 Reward History</h3>
          <div className="history-list">
            {rewardHistory.slice(0, 5).map((item) => (
              <div key={`${item.id}-${item.timestamp}`} className="history-item">
                <span>✅ {item.text}</span>
                <span className="timestamp">{item.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiAdPopupDemo;