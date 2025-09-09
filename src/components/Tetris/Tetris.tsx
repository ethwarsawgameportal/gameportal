"use client";
import Tetris from "react-tetris";
import React, { useEffect, useState } from "react";
import Header from "../Header";

const DappTetrisPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Add overflow hidden to body
    document.body.style.overflow = "hidden";

    // Cleanup function to restore overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tetris</h1>
          <p className="text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white">
      <Header pageType="game" />

      <div className="flex justify-center">
        <div className="min-h-screen  p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Tetris</h1>
            <Tetris
              keyboardControls={{
                // Default values shown here. These will be used if no
                // `keyboardControls` prop is provided.
                down: "MOVE_DOWN",
                left: "MOVE_LEFT",
                right: "MOVE_RIGHT",
                space: "HARD_DROP",
                z: "FLIP_COUNTERCLOCKWISE",
                x: "FLIP_CLOCKWISE",
                up: "FLIP_CLOCKWISE",
                // p: "TOGGLE_PAUSE",
                // c: "HOLD",
                // shift: "HOLD",
              }}
            >
              {({
                HeldPiece,
                Gameboard,
                PieceQueue,
                points,
                linesCleared,
                state,
                controller,
              }) => (
                <div className="flex flex-col md:flex-row gap-6 items-start justify-center w-full">
                  {/* Game Info */}
                  <div className="">
                    <div className=" p-4 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-2">Score</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        Points: {points}
                      </p>
                      <p className="text-lg text-green-600">
                        Lines: {linesCleared}
                      </p>
                    </div>

                    {/* <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Held Piece</h3>
                  <HeldPiece />
                </div> */}
                  </div>

                  {/* Game Board */}
                  <div className="flex flex-col items-center">
                    <div className=" p-4 rounded-lg shadow-md">
                      <Gameboard />
                    </div>

                    {state === "LOST" && (
                      <div className="mt-4 text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">
                          Game Over!
                        </h2>
                        <button
                          onClick={controller.restart}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                          New Game
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-4 rounded-lg shadow-md hidden sm:block">
                    <h3 className="text-lg font-semibold mb-2">Next Pieces</h3>
                    <PieceQueue />
                  </div>
                </div>
              )}
            </Tetris>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DappTetrisPage;
