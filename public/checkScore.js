export async function checkIfHighScore(score) {
  try {
    response = await fetch("/api/getScores");
    if (!response.ok) {
      throw new Error("Failed to get scores from leaderboard");
    }
    const leaderboard = await response.json();
    console.log(leaderboard.high_scores);
    if (leaderboard.high_scores.length < 100) {
      return true;
    }
    const worstScore =
      leaderboard.high_scores[leaderboard.high_scores.length - 1].score;
    return score > worstScore;
  } catch (e) {
    console.log("error checking scores");
    return false;
  }
}
