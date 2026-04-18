
export const cosineSimilarity = (vecA, vecB) => {

 
  if (!vecA.length || !vecB.length) return 0;

  const dotProduct = vecA.reduce((sum, val, i) => {
    return sum + val * vecB[i];
  }, 0);

 
  const magnitudeA = Math.sqrt(
    vecA.reduce((sum, val) => sum + val * val, 0)
  );


  const magnitudeB = Math.sqrt(
    vecB.reduce((sum, val) => sum + val * val, 0)
  );

  return dotProduct / (magnitudeA * magnitudeB);
};


// vecA = first embedding (e.g. user query)
// vecB = second embedding (saved item)