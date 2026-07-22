import { useState, useCallback } from 'react';
// ✅ Correct import - use named imports
import { TonAdPopupShow, GetMultiTonAd } from 'ton-ai-sdk';

// Your actual IDs here
const BLOCK_ID = 'your-block-id-here'; // ← REPLACE with your actual Block ID

export const useTonAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch multiple ads
  const fetchAds = useCallback(async (limit = 5) => {
    setLoading(true);
    setError(null);

    try {
      console.log('📡 Fetching ads with limit:', limit);
      console.log('📌 Using Block ID:', BLOCK_ID);
      
      // ✅ Check if GetMultiTonAd is available
      if (typeof GetMultiTonAd !== 'function') {
        throw new Error('GetMultiTonAd is not available. SDK may not be loaded.');
      }
      
      const result = await GetMultiTonAd(BLOCK_ID, limit);
      console.log('📦 Fetch result:', result);
      
      if (result && result.ads && result.ads.length > 0) {
        setAds(result.ads);
        console.log(`✅ Loaded ${result.ads.length} ads`);
        return result.ads;
      } else {
        setError('No ads available');
        return [];
      }
    } catch (err) {
      const errorMsg = 'Failed to load ads: ' + err.message;
      setError(errorMsg);
      console.error('❌ Fetch ads error:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Show rewarded ad (single popup)
  const showRewardedAd = useCallback(() => {
    return new Promise((resolve, reject) => {
      try {
        console.log('🎬 Showing rewarded ad...');
        console.log('📌 Using Block ID:', BLOCK_ID);
        
        // ✅ Check if TonAdPopupShow is available
        if (typeof TonAdPopupShow !== 'function') {
          throw new Error('TonAdPopupShow is not available. SDK may not be loaded.');
        }
        
        TonAdPopupShow({
          blockId: BLOCK_ID,
          onAdClick: (ad) => {
            console.log('🎯 Ad clicked:', ad);
            resolve(ad);
          },
          onAdError: (error) => {
            console.error('❌ Ad error:', error);
            reject(new Error(error));
          },
          onAdClose: () => {
            console.log('👋 Ad closed');
          },
        });
      } catch (err) {
        console.error('❌ Error showing ad:', err);
        reject(new Error(err.message));
      }
    });
  }, []);

  // Show native ad
  const showNativeAd = useCallback((ad) => {
    return new Promise((resolve, reject) => {
      try {
        if (!ad) {
          reject(new Error('No ad provided'));
          return;
        }

        console.log('🎬 Showing native ad:', ad.adId);
        
        // ✅ Check if TonAdPopupShow is available
        if (typeof TonAdPopupShow !== 'function') {
          throw new Error('TonAdPopupShow is not available. SDK may not be loaded.');
        }
        
        TonAdPopupShow({
          tonAd: ad,
          onAdClick: (clickedAd) => {
            console.log('🎯 Native ad clicked:', clickedAd);
            resolve(clickedAd);
          },
          onAdError: (error) => {
            console.error('❌ Native ad error:', error);
            reject(new Error(error));
          },
          onAdClose: () => {
            console.log('👋 Native ad closed');
          },
        });
      } catch (err) {
        console.error('❌ Error showing native ad:', err);
        reject(new Error(err.message));
      }
    });
  }, []);

  return {
    ads,
    loading,
    error,
    fetchAds,
    showRewardedAd,
    showNativeAd,
  };
};

export default useTonAds;