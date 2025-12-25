export const calculateToeflScore = (correctCount: number, totalQuestions: number) => {
  if (correctCount === 0) return 310;
  
  // Rasio keberhasilan (0 - 1)
  const ratio = correctCount / totalQuestions;
  
  // Rentang TOEFL ITP adalah 310 sampai 677 (Selisih 367)
  const baseScore = 310;
  const maxAddition = 367;
  
  const finalScore = baseScore + Math.round(ratio * maxAddition);
  
  return finalScore;
};