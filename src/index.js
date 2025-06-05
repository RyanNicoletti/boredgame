export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/getScores") {
      const response = await getScores(env);
      return response;
    } else if (url.pathname === "/api/postScore") {
      const response = await postScore(request, env);
      return response;
    }

    return env.ASSETS.fetch(request);
  },
};

async function getScores(env) {
  try {
    const high_scores = await env.LEADERBOARD.get("high_scores", "json");
    console.log("Raw KV data:", high_scores);
    console.log("Type of high_scores:", typeof high_scores);
    return new Response(JSON.stringify({ high_scores: high_scores || [] }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error fetching scores:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function postScore(req, env) {
  const high_scores = await env.LEADERBOARD.put("high_scores", "json");
  const scoreToAdd = {};
  scoreToAdd.high_scores.append();
  const scores = high_scores.map((highScore) => {
    return highScore.score;
  });
  console.log(scores);
  const res = await req.json();
}
