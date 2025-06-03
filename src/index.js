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
    const scores = await env.LEADERBOARD.get("scores");
    console.log("SCORES: ", scores);
    return new Response({ scores: scores });
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
}
