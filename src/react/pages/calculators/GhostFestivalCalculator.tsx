import EventResultCard from "@components/EventResultCard";
import type { BaseDifficulty } from "@interfaces/Ievent";
import { eventDifficulties } from "@utils/events/event";
import { ImageExporter } from "@utils/ImageExporter";
import React, { useState } from "react";
import { formatName } from "@utils/utils";
import { getGhostFestivalRuns } from "@utils/calculators";

function GhostFestivalCalculator() {
  const [uiState, setUiState] = useState<"main" | "mini">("main");
  const [difficulty, setDifficulty] = useState<BaseDifficulty | null>(null);
  const [haveAttire, setHaveAttire] = useState<boolean>(false);
  const [haveBuff, setHaveBuff] = useState<boolean>(false);
  const [runs, setRuns] = useState<null | number>(null);
  const [dropsPerRun, setDropsPerRun] = useState<null | number>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function handleReset() {
    setDifficulty(null);
    setHaveAttire(false);
    setHaveBuff(false);
  }

  function handleCalculate(uiState: "main" | "mini") {
    if (!difficulty) {
      setError("Please select a difficulty");
      setRuns(null);
      setDropsPerRun(null);
      return;
    }

    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    try {
      const runs = getGhostFestivalRuns(difficulty, haveAttire, haveBuff, uiState);
      setRuns(runs.runs);
      setDropsPerRun(runs.drop);
    } catch (error) {
      setError((error as Error).message);
      setRuns(null);
      setDropsPerRun(null);
    }
  }

  return (
    <div className="flex flex-col gap-16 p-4 items-center">
      <div className=" flex justify-center items-center gap-4">
        <img src={ImageExporter.tabIconGhostFestival} alt="Ghost Festival  Calculator" width={64} height={64} />
        <h1 className="text-4xl text-primary ">{uiState === "main" ? "Ghost Festival" : "Return of the Dead"}</h1>
      </div>
      <div className="flex gap-15">
        <button
          className={`btn btn-outline btn-info w-[200px] ${uiState === "main" ? "btn-active" : ""}`}
          onClick={() => {
            setUiState("main");
            handleReset();
          }}
        >
          Ghost Festival
        </button>
        <button
          className={`btn btn-outline btn-info w-[200px] ${uiState === "mini" ? "btn-active" : ""}`}
          onClick={() => {
            setUiState("mini");
            handleReset();
          }}
        >
          Return of the Dead
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="card card-border bg-base-300 text-neutral-content w-96 border-gray-400">
          <div className="card-body ">
            <h2 className="card-title self-center">Inputs</h2>
            <div className="flex flex-col gap-4 h-full mt-10">
              <div>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Select Difficulty
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-300 rounded-box border border-gray-400 z-1 w-52 p-2 shadow-sm max-h-56 overflow-y-auto overflow-x-hidden flex-nowrap"
                  >
                    {eventDifficulties.map((difficulty, index) => (
                      <React.Fragment key={index}>
                        <li>
                          <a
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setDifficulty(difficulty);
                              setTimeout(() => {
                                (document.activeElement as HTMLElement)?.blur();
                              }, 0);
                            }}
                          >
                            {formatName(difficulty)}
                          </a>
                        </li>
                        {index < eventDifficulties.length - 1 && <li className="divider h-[1px]" />}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
                <div className="text-gray-400 ps-2">
                  Selected Difficulty: {difficulty ? formatName(difficulty) : "None"}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={haveAttire}
                  className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
                  onChange={(e) => {
                    setHaveAttire(e.target.checked);
                  }}
                />
                <p className="text-gray-300 text-md">Have you purchased the attire (50% more progress drop)</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={haveBuff}
                  className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
                  onChange={(e) => {
                    setHaveBuff(e.target.checked);
                  }}
                />
                <p className="text-gray-300 text-md">
                  Buff Active - {uiState === "main" ? "Pumpkin Candy" : "Jalapeno Cookie"} (10%)
                </p>
              </div>
            </div>
            <div className="flex mt-4 gap-4 justify-between">
              <button className="btn btn-soft btn-error" onClick={handleReset}>
                Reset
              </button>
              <button className="btn btn-soft btn-primary" onClick={() => handleCalculate(uiState)}>
                Calculate
              </button>
            </div>
          </div>
        </div>
        <EventResultCard
          runs={runs}
          dropsPerRun={dropsPerRun}
          error={error}
          title={uiState === "main" ? "Ghost Festival Event Calculator" : "Return of the Dead Event Calculator"}
          titleImage={ImageExporter.tabIconGhostFestival}
          desc="Select the difficulty,if you have the attire and if you have the buff active to see how many runs you need to complete the Ghost Festival or Return of the Dead(mini) event"
          dropImage={uiState === "main" ? ImageExporter.ghostFestivalProg : ImageExporter.ghostFestivalMiniProg}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default GhostFestivalCalculator;
