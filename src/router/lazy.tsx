import React, { lazy } from 'react';

const handleCatchChunkError = () => {
  window.location.reload();

  return { default: () => <div>Loading...</div> };
};

// Home
export const Home = lazy(() =>
  import('@/pages/Home')
    .then(({ Home }) => ({ default: Home }))
    .catch(handleCatchChunkError)
);
