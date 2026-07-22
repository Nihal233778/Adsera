export const AD_CONFIG = {
  appId: process.env.REACT_APP_TON_AI_APP_ID || '6a3d6f1f003774752752430b',
  blockId: process.env.REACT_APP_TON_AI_BLOCK_ID || '6a3ca3ebcb303f35e850f89b',
  debug: process.env.REACT_APP_DEBUG_MODE === 'true',
  defaultLimit: 5,
};

export default AD_CONFIG;