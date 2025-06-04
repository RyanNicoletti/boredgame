export async function checkIfHighScore(score) {
  try {
    const response = await fetch("/api/getScores");
    if (!response.ok) {
      throw new Error("Failed to get scores from leaderboard");
    }
    const data = await response.json();
    console.log(data);
    const high_scores = data["high_scores"];
    console.log(high_scores, high_scores[0]);
    if (high_scores.length < 100) {
      return true;
    }
    const worstScore = high_scores[high_scores.length - 1].score;
    return score > worstScore;
  } catch (e) {
    console.log(e, "error checking scores");
    return false;
  }
}
