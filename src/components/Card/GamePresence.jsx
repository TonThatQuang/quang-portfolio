import { useEffect, useState } from "react";
import { useLanyard } from "use-lanyard";
import "./GamePresence.css";

const activityTypes = {
  0: "PLAYING",
  1: "STREAMING",
  2: "LISTENING TO",
  3: "WATCHING",
  5: "COMPETING IN",
};

function GamePresence() {
  const discordId = "1201086421449056287";
  const presence = useLanyard(discordId);

  const activities = presence?.activities || [];

  // =========================
  // GAME / CUSTOM RP
  // =========================

  const game = activities.find(
    (activity) =>
      activity.type === 0 ||
      activity.type === 1 ||
      activity.type === 3 ||
      activity.type === 5
  );

  // =========================
  // SPOTIFY
  // =========================

  const spotifyActivity = activities.find(
    (activity) => activity.type === 2
  );

  const spotify = presence?.spotify;

  // =========================
  // TIMER
  // =========================

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const hasActiveTrack = Boolean(
      game?.timestamps?.start ||
      spotify?.timestamps?.start
    );

    if (!hasActiveTrack) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [
    game?.timestamps?.start,
    spotify?.timestamps?.start,
  ]);

  // =========================
  // FORMAT TIME
  // =========================

  const formatElapsed = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(
        secs
      ).padStart(2, "0")}`;
    }

    return `${minutes}:${String(secs).padStart(2, "0")}`;
  };

  // =========================
  // ELAPSED TIME
  // =========================

  const gameElapsed =
    game?.timestamps?.start
      ? Math.max(
          0,
          Math.floor(
            (now - game.timestamps.start) / 1000
          )
        )
      : 0;

  const spotifyElapsed =
    spotify?.timestamps?.start
      ? Math.max(
          0,
          Math.floor(
            (now - spotify.timestamps.start) / 1000
          )
        )
      : 0;

  // =========================
  // DISCORD IMAGE
  // =========================

  const getDiscordImage = (activity) => {
    const image = activity?.assets?.large_image;

    if (!image) {
      return null;
    }

    // ---------------------------------
    // External image
    // ---------------------------------
    //
    // Ví dụ:
    //
    // mp:external/xxxxx/https/preview.redd.it/abc.jpg
    //
    // Discord Media Proxy
    //

    if (image.startsWith("mp:")) {
      return `https://media.discordapp.net/${image.substring(3)}`;
    }

    // ---------------------------------
    // Normal Discord Application Asset
    // ---------------------------------

    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${image}.png`;
  };

  // =========================
  // GAME IMAGE
  // =========================

  const gameImage = getDiscordImage(game);

  // =========================
  // DEBUG
  // =========================

  console.log("GAME:", game);
  console.log("ASSETS:", game?.assets);
  console.log("GAME IMAGE:", gameImage);

  // =========================
  // WAIT FOR LANYARD
  // =========================

  if (!presence) {
    return null;
  }

  return (
    <>
      {/* =====================================
          GAME / CUSTOM RP
      ===================================== */}

      {game && (
        <div className="game-presence">

          {/* HEADER */}

          <div className="game-header">

            <span className="playing-dot"></span>

            <span>
              {activityTypes[game.type] || "ACTIVITY"}
            </span>

          </div>

          {/* CONTENT */}

          <div className="game-content">

            {/* GAME / CUSTOM RP IMAGE */}

            {gameImage && (
              <img
                className="game-icon"
                src={gameImage}
                alt={
                  game.assets?.large_text ||
                  game.name ||
                  "Activity"
                }
                onError={(e) => {
                  console.log(
                    "Không tải được ảnh:",
                    e.currentTarget.src
                  );

                  e.currentTarget.style.display = "none";
                }}
              />
            )}

            {/* GAME INFO */}

            <div className="game-info">

              {/* NAME */}

              <div className="game-name">
                {game.name}
              </div>

              {/* DETAILS */}

              {game.details && (
                <div className="game-details">
                  {game.details}
                </div>
              )}

              {/* STATE */}

              {game.state && (
                <div className="game-state">
                  {game.state}
                </div>
              )}

            </div>

          </div>

          {/* ELAPSED */}

          {game.timestamps?.start && (
            <div className="game-elapsed">

              <span className="elapsed-dot"></span>

              <span>
                {formatElapsed(gameElapsed)} elapsed
              </span>

            </div>
          )}

        </div>
      )}

      {/* =====================================
          SPOTIFY
      ===================================== */}

      {spotifyActivity && spotify && (
        <div className="game-presence spotify-presence">

          {/* HEADER */}

          <div className="game-header">

            <span className="playing-dot"></span>

            <span>
              LISTENING TO
            </span>

          </div>

          {/* CONTENT */}

          <div className="game-content">

            {/* SPOTIFY ALBUM ART */}

            {spotify.album_art_url && (
              <img
                className="game-icon"
                src={spotify.album_art_url}
                alt={
                  spotify.album ||
                  "Spotify"
                }
              />
            )}

            {/* SPOTIFY INFO */}

            <div className="game-info">

              {/* NAME */}

              <div className="game-name">
                Spotify
              </div>

              {/* SONG */}

              {spotify.song && (
                <div className="game-details">
                  {spotify.song}
                </div>
              )}

              {/* ARTIST */}

              {spotify.artist && (
                <div className="game-state">
                  {spotify.artist}
                </div>
              )}

            </div>

          </div>

          {/* ELAPSED */}

          {spotify.timestamps?.start && (
            <div className="game-elapsed">

              <span className="elapsed-dot"></span>

              <span>
                {formatElapsed(spotifyElapsed)} elapsed
              </span>

            </div>
          )}

        </div>
      )}
    </>
  );
}

export default GamePresence;