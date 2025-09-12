"use client";
import Tetris from "react-tetris";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import { FaArrowLeft, FaArrowRight, FaPause, FaPlay } from "react-icons/fa";

import { FaArrowRotateRight, FaArrowRotateLeft } from "react-icons/fa6";
import {
  PiArrowFatLinesDownBold,
  PiSelectionBackgroundBold,
} from "react-icons/pi";

interface Props {
  controller: any;
}

const DappTetrisPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    document.body.style.overflow = "hidden";

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
        <div className="">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-3 md:mb-6">
              Tetris
            </h1>
            <Tetris
              keyboardControls={{
                down: "MOVE_DOWN",
                left: "MOVE_LEFT",
                right: "MOVE_RIGHT",
                space: "HARD_DROP",
                z: "FLIP_COUNTERCLOCKWISE",
                x: "FLIP_CLOCKWISE",
                up: "FLIP_CLOCKWISE",
                p: "TOGGLE_PAUSE",
                c: "HOLD",
                shift: "HOLD",
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
                <div className="flex flex-col items-center">
                  <div className="min-w-40 p-0.5 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 border-l-0 -mb-3">
                    <div className="p-0.5 rounded-xl shadow-inner bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-500 border-r-0">
                      <div className="flex flex-col items-center py-0.5 rounded-lg shadow-lg bg-[#030819] border border-gray-600">
                        <h3 className="text-lg font-semibold max-w-[77px] text-center">
                          Score
                        </h3>
                        <p className="text-lg text-center font-bold text-blue-600 -mt-2">
                          {points}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-center w-full">
                    <div className="h-[430px] max-sm:w-[65px] flex flex-col justify-between">
                      <div className="min-h-[316px] flex flex-col justify-between">
                        <div className="max-sm:max-w-[77px] max-w-32 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 border-l-0 pr-0 z-10 -mr-4 mt-4">
                          <div className="p-0.5 rounded-xl shadow-inner bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-500 border-r-0 pr-0">
                            <div className="p-1 md:p-4 pr-4 md:pr-7 !pt-1 rounded-lg shadow-lg bg-[#030819] border border-gray-600">
                              <h3 className="max-sm:max-w-[59px] text-lg font-semibold md:mb-2 text-center">
                                Hold
                              </h3>
                              <div className="max-sm:max-w-[59px]">
                                <HeldPiece />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="max-sm:max-w-[77px] max-w-32 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 border-l-0 pr-0 z-10 -mr-4">
                          <div className="p-0.5 rounded-xl shadow-inner bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-500 border-r-0 pr-0">
                            <div className="p-1 md:px-4 py-2 pr-4 md:pr-7 rounded-lg shadow-lg bg-[#030819] border border-gray-600">
                              <h3 className="text-lg font-semibold text-center">
                                Lines
                              </h3>
                              <p className="text-lg text-center font-bold text-blue-600 -mt-1">
                                {linesCleared}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <LeftController controller={controller} />
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="p-1 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 z-20">
                        <div className="p-1 rounded-xl shadow-inner bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-500">
                          <div className="p-4 rounded-lg shadow-lg bg-[#030819] border border-gray-600 relative">
                            <Gameboard />
                            {state === "LOST" && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75">
                                <h2 className="text-2xl font-bold text-red-600 mb-4">
                                  Game Over!
                                </h2>
                                <button
                                  onClick={controller.restart}
                                  className="bg-blue-600 hover:bg-blue-600/90 text-white font-bold py-2 px-4 rounded"
                                >
                                  New Game
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[430px] flex flex-col justify-between relative">
                      <PauseController controller={controller} />
                      <div className="max-sm:w-[90px] w-32 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 border-l-0 pl-0 z-10 -ml-4 mt-4">
                        <div className="p-0.5 rounded-xl shadow-inner bg-gradient-to-br from-gray-300 to-gray-400 border border-gray-500 border-l-0 pl-0">
                          <div className="p-1 md:p-4 pl-5 md:pl-7 !pt-1 rounded-lg shadow-lg bg-[#030819] border border-gray-600">
                            <h3 className="text-lg font-semibold md:mb-2 text-center max-w-[77px]">
                              Next
                            </h3>

                            <div className="max-h-[233px] max-w-[77px] overflow-hidden">
                              <PieceQueue />
                            </div>
                          </div>
                        </div>
                      </div>
                      <RightController controller={controller} />
                    </div>
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

function PauseController({ controller }: Props): JSX.Element {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div className="top-0 left-0">
      <div className="flex items-center justify-center h-10 w-full pl-1 pr-4 -mt-11 min-w-[65px]">
        <button
          onClick={() => {
            isPaused ? controller.resume() : controller.pause();
            setIsPaused(!isPaused);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full"
        >
          {isPaused ? <FaPlay /> : <FaPause />}
        </button>
      </div>
    </div>
  );
}

function LeftController({ controller }: Props): JSX.Element {
  return (
    <div className="">
      <div className="flex items-center justify-between h-10 w-full pl-1 pr-2 mt-8 min-">
        <button
          onClick={controller.moveLeft}
          className="w-10 h-10 border-2 border-gray-300 flex items-center justify-center rounded-full"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={controller.moveRight}
          className="w-10 h-10 border-2 border-gray-300 flex items-center justify-center rounded-full"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

function RightController({ controller }: Props): JSX.Element {
  return (
    <div>
      <div className="flex justify-center w-full pl-1 pr-2 mt-5">
        <button
          onClick={controller.hold}
          className="w-10 h-10 border-2 border-gray-300 flex items-center justify-center rounded-full"
        >
          <PiSelectionBackgroundBold />
        </button>
      </div>
      <div className="flex items-center justify-between h-10 w-full pl-1 pr-2 mt-2">
        <button
          onClick={controller.flipCounterclockwise}
          className="w-10 h-10 border-2 border-gray-300 flex items-center justify-center rounded-full"
        >
          <FaArrowRotateLeft />
        </button>
        <button
          onClick={controller.flipClockwise}
          className="w-10 h-10 border-2 border-gray-300 flex items-center justify-center rounded-full"
        >
          <FaArrowRotateRight />
        </button>
      </div>
      <div className="flex justify-center w-full pl-1 pr-2 mt-2">
        <button
          onClick={controller.hardDrop}
          className="w-10 h-10 border-2 border-gray-300 flex items-center justify-center rounded-full"
        >
          <PiArrowFatLinesDownBold />
        </button>
      </div>
    </div>
  );
}
