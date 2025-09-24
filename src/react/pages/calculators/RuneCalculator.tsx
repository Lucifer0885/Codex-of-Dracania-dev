import ResultCard from "@components/ResultCard";
import type { RuneTier, RuneType } from "@interfaces/Igem";
import { getRuneCost } from "@utils/calculators";
import { OffensiveRuneTier } from "@utils/gem";
import React, { useState } from "react";
import { ImageExporter } from "@utils/ImageExporter";

function RuneCalculator() {
  const [startingTier, setStartingTier] = useState<null | RuneTier>(null);
  const [targetTier, setTargetTier] = useState<null | RuneTier>(null);
  const [runeType, setRuneType] = useState<null | RuneType>(null);
  const [upgradeCost, setUpgradeCost] = useState<null | number>(null);
  const [amount, setAmount] = useState<string | number>("");
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function formatName(string: string) {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function handleReset() {
    setStartingTier(null);
    setTargetTier(null);
    setRuneType(null);
    setAmount("");
  }

  function handleCalculate() {
    if (!(startingTier && targetTier && runeType && amount)) {
      setError("Please select a value for all fields");
      setUpgradeCost(null);
      return;
    }

    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    try {
      const cost = getRuneCost(+amount, startingTier, targetTier, runeType);
      setUpgradeCost(cost);
    } catch (error) {
      setError((error as Error).message);
      setUpgradeCost(null);
    }
  }

  return (
    <div className="flex flex-col gap-16 p-4 items-center">
      <div className=" flex justify-center items-center gap-4">
        <img src={ImageExporter.rune} alt="Rune Calculator" width={100} height={100} />
        <h1 className="text-4xl text-primary">Rune Calculator</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="card card-border bg-base-300 text-neutral-content w-96 border-gray-400">
          <div className="card-body ">
            <h2 className="card-title self-center">Inputs</h2>
            <div className="flex flex-col gap-4">
              <div>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Select Starting Rune Tier
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-300 rounded-box border border-gray-400 z-1 w-52 p-2 shadow-sm max-h-56 overflow-y-auto overflow-x-hidden flex-nowrap"
                  >
                    {OffensiveRuneTier.map((tier, index) => (
                      <React.Fragment key={tier.name}>
                        <li>
                          <a
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setStartingTier(tier);
                              setTimeout(() => {
                                (document.activeElement as HTMLElement)?.blur();
                              }, 0);
                            }}
                          >
                            {formatName(tier.name)}
                          </a>
                        </li>
                        {index < OffensiveRuneTier.length - 1 && <li className="divider h-[1px]" />}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
                <div className="text-gray-400 ps-2">
                  Starting Tier: {startingTier ? formatName(startingTier.name) : "None"}
                </div>
              </div>
              <div>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Select Target Rune Tier
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-300 rounded-box border border-gray-400 z-1 w-52 p-2 shadow-sm max-h-56 overflow-y-auto overflow-x-hidden flex-nowrap"
                  >
                    {OffensiveRuneTier.map((tier, index) => (
                      <React.Fragment key={tier.name}>
                        <li>
                          <a
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setTargetTier(tier);
                              setTimeout(() => {
                                (document.activeElement as HTMLElement)?.blur();
                              }, 0);
                            }}
                          >
                            {formatName(tier.name)}
                          </a>
                        </li>
                        {index < OffensiveRuneTier.length - 1 && <li className="divider h-[1px]" />}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
                <div className="text-gray-400 ps-2">
                  Target Tier: {targetTier ? formatName(targetTier.name) : "None"}
                </div>
              </div>
              <div>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Select Rune Type
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-300 rounded-box border border-gray-400 z-1 w-52 p-2 shadow-sm max-h-56 overflow-y-auto overflow-x-hidden flex-nowrap"
                  >
                    <li>
                      <a
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setRuneType("offensive");
                          setTimeout(() => {
                            (document.activeElement as HTMLElement)?.blur();
                          }, 0);
                        }}
                      >
                        Offensive
                      </a>
                    </li>
                    <div className="divider h-[1px]" />
                    <li>
                      <a
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setRuneType("defensive");
                          setTimeout(() => {
                            (document.activeElement as HTMLElement)?.blur();
                          }, 0);
                        }}
                      >
                        Defensive
                      </a>
                    </li>
                    <div className="divider h-[1px]" />
                    <li>
                      <a
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setRuneType("utility");
                          setTimeout(() => {
                            (document.activeElement as HTMLElement)?.blur();
                          }, 0);
                        }}
                      >
                        Utility
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="text-gray-400 ps-2">Rune Type: {runeType ? formatName(runeType) : "None"}</div>
              </div>
              <label className="input input-ghost border-gray-400">
                Amount
                <input
                  type="text"
                  className="grow"
                  onChange={(e) => setAmount(Number(e.target.value.trim()))}
                  value={amount}
                />
              </label>
            </div>
            <div className="flex mt-4 gap-4 justify-between">
              <button className="btn btn-soft btn-error" onClick={handleReset}>
                Reset
              </button>
              <button className="btn btn-soft btn-primary" onClick={handleCalculate}>
                Calculate
              </button>
            </div>
          </div>
        </div>
        <ResultCard
          upgradeCost={upgradeCost}
          error={error}
          title="Rune Upgrade Cost"
          titleImage={ImageExporter.rune}
          desc="Select rune tiers and type, enter an amount"
          descImage={ImageExporter.runeDust}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default RuneCalculator;
