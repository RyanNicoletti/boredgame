export async function getGameToken() {
  try {
    const response = await fetch("/api/getToken");
    if (!response.ok) {
      throw new Error("Failed to get game token");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e, "error getting token");
    return null;
  }
}

export async function checkIfHighScore(score) {
  try {
    const response = await fetch("/api/getScores");
    if (!response.ok) {
      throw new Error("Failed to get scores from leaderboard");
    }
    const data = await response.json();
    const high_scores = data["high_scores"];
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

export async function fetchLeaderboard() {
  try {
    const response = await fetch("/api/getScores");
    if (!response.ok) {
      throw new Error("Failed to get scores from leaderboard");
    }
    const data = await response.json();
    return data["high_scores"];
  } catch (e) {
    console.log(e, "error fetching scores");
    return false;
  }
}

export async function addHighScore(data, token, gameStartTime, gameEndTime) {
  try {
    const response = await fetch("/api/postScore", {
      method: "POST",
      body: JSON.stringify({
        data,
        token,
        gameStartTime,
        gameEndTime,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
