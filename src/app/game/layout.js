import { GameProvider } from "./context/GameContext";

export const metadata = {
  title: "Game",
};

export default function GameLayout({ children }) {
  return (
    <GameProvider>
      <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
        <header className="w-full px-6 py-4 border-b border-zinc-700 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">FruityFix</span>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          {children}
        </main>
      </div>
    </GameProvider>
  );
}
