"use client";
import dynamic from "next/dynamic";

const DappTetrisPage = dynamic(() => import("../components/Tetris/Tetris"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Tetris</h1>
        <p className="text-gray-600">Loading game...</p>
      </div>
    </div>
  ),
});

export default function TetrisPage() {
  return <DappTetrisPage />;
}
