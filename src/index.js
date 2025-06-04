export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      switch (url.pathname) {
        case "/api/getScores":
          const response = await fetchScores(env);
          return response;
        default:
          console.log(`UNKNOWN PATHNAME: ${url.pathname}`);
          return new Response("Invalid path.");
      }
    }
    return env.ASSETS.fetch(request);
  },
};

async function fetchScores(env) {
  try {
    const high_scores = await env.LEADERBOARD.get("high_scores", "json");
    console.log("SCORES: ", high_scores);
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
