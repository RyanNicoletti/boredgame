export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/getScores") {
      const response = await getScores(env);
      return response;
    } else if (url.pathname === "/api/postScore") {
      const response = await postScore(request, env);
      return response;
    } else if (url.pathname === "/api/getToken") {
      const response = await getToken(env);
      return response;
    }

    return env.ASSETS.fetch(request);
  },
};

async function getToken(env) {
  try {
    const token = crypto.randomUUID();
    const timestamp = Date.now();

    await env.LEADERBOARD.put(`token:${token}`, timestamp.toString(), {
      expirationTtl: 1200,
    });

    return new Response(JSON.stringify({ token, timestamp }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error generating token:", e);
    return new Response(JSON.stringify({ error: "Failed to generate token" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function getScores(env) {
  try {
    const high_scores = await env.LEADERBOARD.get("high_scores", "json");
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

async function postScore(request, env) {
  try {
    const res = await request.json();

    const { data: player, token, gameStartTime, gameEndTime } = res;

    const storedTimestamp = await env.LEADERBOARD.get(`token:${token}`);
    if (!storedTimestamp) {
      return new Response(
        JSON.stringify({
          success: false,
          rejected: true,
          reason: "Invalid or expired token",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const gameDuration = gameEndTime - gameStartTime;
    if (gameDuration < 3000) {
      await env.LEADERBOARD.delete(`token:${token}`);
      return new Response(
        JSON.stringify({
          success: false,
          rejected: true,
          reason: "Game completed too quickly",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!player.initials || player.initials.length !== 3) {
      return new Response(
        JSON.stringify({
          success: false,
          rejected: true,
          reason: "Initials must be exactly 3 characters",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await env.LEADERBOARD.delete(`token:${token}`);

    let high_scores = await env.LEADERBOARD.get("high_scores", "json");

    if (!high_scores) {
      high_scores = [];
    }

    const existingPlayerIndex = high_scores.findIndex(
      (score) => score.initials === player.initials
    );

    if (existingPlayerIndex !== -1) {
      const existingScore = high_scores[existingPlayerIndex].score;

      if (player.score <= existingScore) {
        return new Response(
          JSON.stringify({
            success: false,
            rejected: true,
            reason: "Score not higher than existing score",
            existingScore: existingScore,
            submittedScore: player.score,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      high_scores.splice(existingPlayerIndex, 1);
    }

    const scoreToAdd = { initials: player.initials, score: player.score };
    high_scores.push(scoreToAdd);

    high_scores.sort((a, b) => b.score - a.score);
    const rankedScores = high_scores.map((score, index) => ({
      ...score,
      rank: index + 1,
    }));

    await env.LEADERBOARD.put("high_scores", JSON.stringify(rankedScores));

    const newPlayerRank = rankedScores.find(
      (score) =>
        score.initials === player.initials && score.score === player.score
    ).rank;

    return new Response(
      JSON.stringify({
        success: true,
        rank: newPlayerRank,
        score: player.score,
        initials: player.initials,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error posting score:", error);
    return new Response(JSON.stringify({ error: "Failed to save score" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
