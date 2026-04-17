"use client";

import { useGame } from "./context/GameContext";

const GamePage = () => {
  const { players, gameState, setGameState, addPlayer, resetGame } = useGame();

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <h1 className="text-2xl font-semibold">État : {gameState}</h1>

      <div className="w-full flex flex-col gap-2">
        {players.map((p) => (
          <div key={p.id} className="flex justify-between bg-zinc-800 rounded px-4 py-2">
            <span>{p.name}</span>
            <span className="font-mono">{p.score} pts</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => addPlayer(`Joueur ${players.length + 1}`)}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Ajouter joueur
        </button>
        <button
          onClick={() => setGameState("playing")}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
        >
          Démarrer
        </button>
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-red-700 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default GamePage;
