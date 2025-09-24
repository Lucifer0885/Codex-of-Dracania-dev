import ResultCard from "@components/ResultCard";
import type { JewelTier } from "@interfaces/Igem";
import { getJewelCost } from "@utils/calculators";
import { JewelTiers } from "@utils/gem";
import React, { useState } from "react";
import { ImageExporter } from "@utils/ImageExporter";

function JewelCalculator() {
  const [startingTier, setStartingTier] = useState<null | JewelTier>(null);
  const [targetTier, setTargetTier] = useState<null | JewelTier>(null);
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
    setAmount("");
  }

  function handleCalculate() {
    if (!(startingTier && targetTier && amount)) {
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
      const cost = getJewelCost(+amount, startingTier, targetTier);
      setUpgradeCost(cost);
    } catch (error) {
      setError((error as Error).message);
      setUpgradeCost(null);
    }
  }

  return (
    <div className="flex flex-col gap-16 p-4 items-center">
      <div className=" flex justify-center items-center gap-4">
        <img src={ImageExporter.jewel} alt="Jewel Calculator" width={100} height={100} />
        <h1 className="text-4xl text-primary">Jewel Calculator</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="card card-border bg-base-300 text-neutral-content w-96 border-gray-400">
          <div className="card-body ">
            <h2 className="card-title self-center">Inputs</h2>
            <div className="flex flex-col gap-4">
              <div>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Select Starting Jewel Tier
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-300 rounded-box border border-gray-400 z-1 w-52 p-2 shadow-sm max-h-56 overflow-y-auto overflow-x-hidden flex-nowrap"
                  >
                    {JewelTiers.map((tier, index) => (
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
                        {index < JewelTiers.length - 1 && <li className="divider h-[1px]" />}
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
                    Select Target Jewel Tier
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-300 rounded-box border border-gray-400 z-1 w-52 p-2 shadow-sm max-h-56 overflow-y-auto overflow-x-hidden flex-nowrap"
                  >
                    {JewelTiers.map((tier, index) => (
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
                        {index < JewelTiers.length - 1 && <li className="divider h-[1px]" />}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
                <div className="text-gray-400 ps-2">
                  Target Tier: {targetTier ? formatName(targetTier.name) : "None"}
                </div>
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
          title="Jewel Upgrade Cost"
          titleImage={ImageExporter.jewel}
          desc="Select jewel tiers and type, enter an amount"
          descImage={ImageExporter.shinyDust}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default JewelCalculator;
