import ResultCard from "@components/ResultCard";
import type { OpalTier } from "@interfaces/Igem";
import { getOpalCreateCost, getOpalUpgradeCost } from "@utils/calculators";
import { OpalTiersCreate, OpalTiersUpgrade } from "@utils/gem";
import React, { useState } from "react";

function OpalCalculator() {
  const [uiState, setUIState] = useState<"create" | "upgrade">("create");
  const [opalTier, setOpalTier] = useState<null | OpalTier>(null);
  const [startingTier, setStartingTier] = useState<null | OpalTier>(null);
  const [targetTier, setTargetTier] = useState<null | OpalTier>(null);
  const [upgradeCost, setUpgradeCost] = useState<null | number>(null);
  const [amount, setAmount] = useState<string | number>("");
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function formatName(string: string) {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function handleReset() {
    setOpalTier(null);
    setStartingTier(null);
    setTargetTier(null);
    setAmount("");
  }

  function handleCalculate() {
    if (uiState === "create") {
      if (!(opalTier && amount)) {
        setError("Please select a value for all fields");
        setUpgradeCost(null);
        return;
      }
      setError(null);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      try {
        const cost = getOpalCreateCost(+amount, opalTier);
        setUpgradeCost(cost);
      } catch (error) {
        setError((error as Error).message);
        setUpgradeCost(null);
      }
    } else {
      if (!(startingTier && targetTier && amount)) {
        setError("Please select a value for all fields");
        setUpgradeCost(null);
        return;
      }
      setError(null);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      try {
        const cost = getOpalUpgradeCost(+amount, startingTier, targetTier);
        setUpgradeCost(cost);
      } catch (error) {
        setError((error as Error).message);
        setUpgradeCost(null);
      }
    }
  }

  return (
    <div className="flex flex-col gap-16 p-4 items-center">
      <div className=" flex justify-center items-center gap-4">
        <img src="/src/react/assets/gem.png" alt="Opal Calculator" width={100} height={100} />
        <h1 className="text-4xl text-primary ">
          {uiState === "create" ? "Opal Creation Calculator" : "Opal Upgrade Calculator"}
        </h1>
      </div>
      <div className="flex gap-15">
        <button className="btn btn-outline btn-info w-[200px]" onClick={() => setUIState("create")}>
          Create
        </button>
        <button className="btn btn-outline btn-info w-[200px]" onClick={() => setUIState("upgrade")}>
          Upgrade
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {uiState === "create" ? (
          <div className="card card-border bg-base-300 text-neutral-content w-96 border-gray-400">
            <div className="card-body justify-between">
              <div className="flex flex-col gap-4">
                <h2 className="card-title self-center">Inputs</h2>
                <div className="flex flex-col gap-4">
                  <div className="mt-4">
                    <div className="dropdown">
                      <div tabIndex={0} role="button" className="btn m-1">
                        Select Starting Opal Tier
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-300 rounded-box border border-gray-400 z-1 w-52 p-2 shadow-sm max-h-56 overflow-y-auto overflow-x-hidden flex-nowrap"
                      >
                        {OpalTiersCreate.map((tier, index) => (
                          <React.Fragment key={tier.name}>
                            <li>
                              <a
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  setOpalTier(tier);
                                  setTimeout(() => {
                                    (document.activeElement as HTMLElement)?.blur();
                                  }, 0);
                                }}
                              >
                                {formatName(tier.name)}
                              </a>
                            </li>
                            {index < OpalTiersCreate.length - 1 && <li className="divider h-[1px]" />}
                          </React.Fragment>
                        ))}
                      </ul>
                    </div>
                    <div className="text-gray-400 ps-2">Opal Tier: {opalTier ? formatName(opalTier.name) : "None"}</div>
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
        ) : (
          <div className="card card-border bg-base-300 text-neutral-content w-96 border-gray-400">
            <div className="card-body justify-between">
              <div className="flex flex-col gap-4">
                <h2 className="card-title self-center">Inputs</h2>
                <div className="flex flex-col gap-4">
                  <div className="mt-4">
                    <div className="dropdown">
                      <div tabIndex={0} role="button" className="btn m-1">
                        Select Starting Opal Tier
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-300 rounded-box border border-gray-400 z-1 w-52 p-2 shadow-sm max-h-56 overflow-y-auto overflow-x-hidden flex-nowrap"
                      >
                        {OpalTiersUpgrade.map((tier, index) => (
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
                            {index < OpalTiersCreate.length - 1 && <li className="divider h-[1px]" />}
                          </React.Fragment>
                        ))}
                      </ul>
                    </div>
                    <div className="text-gray-400 ps-2">
                      Opal Tier: {startingTier ? formatName(startingTier.name) : "None"}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="dropdown">
                      <div tabIndex={0} role="button" className="btn m-1">
                        Select Starting Opal Tier
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-300 rounded-box border border-gray-400 z-1 w-52 p-2 shadow-sm max-h-56 overflow-y-auto overflow-x-hidden flex-nowrap"
                      >
                        {OpalTiersUpgrade.map((tier, index) => (
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
                            {index < OpalTiersUpgrade.length - 1 && <li className="divider h-[1px]" />}
                          </React.Fragment>
                        ))}
                      </ul>
                    </div>
                    <div className="text-gray-400 ps-2">
                      Opal Tier: {targetTier ? formatName(targetTier.name) : "None"}
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
        )}
        <ResultCard
          upgradeCost={upgradeCost}
          error={error}
          title={uiState === "create" ? "Opal Creation Result" : "Opal Upgrade Result"}
          titleImage="/src/react/assets/gem.png"
          desc="Select opal tiers, enter an amount"
          descImage="/src/react/assets/shiny-dust.png"
          loading={loading}
        />
      </div>
    </div>
  );
}

export default OpalCalculator;
