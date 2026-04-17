"use client";

import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState("idle"); // idle | playing | paused | over

  useEffect(() => {
    fetch("/api/game")
      .then((r) => r.json())
      .then((data) => {
        setPlayers(data.players ?? []);
        setGameState(data.gameState ?? "idle");
      });
  }, []);

  const save = (nextPlayers, nextGameState) => {
    fetch("/api/game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ players: nextPlayers, gameState: nextGameState }),
    });
  };

  const addPlayer = (name) => {
    const next = [...players, { id: crypto.randomUUID(), name, score: 0 }];
    setPlayers(next);
    save(next, gameState);
  };

  const updatePlayerScore = (id, score) => {
    const next = players.map((p) => (p.id === id ? { ...p, score } : p));
    setPlayers(next);
    save(next, gameState);
  };

  const handleSetGameState = (value) => {
    setGameState(value);
    save(players, value);
  };

  const resetGame = () => {
    setPlayers([]);
    setGameState("idle");
    save([], "idle");
  };

  return (
    <GameContext.Provider
      value={{
        players,
        gameState,
        setGameState: handleSetGameState,
        addPlayer,
        updatePlayerScore,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
};
