import { Copy, Route } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Toast from "@components/Toast";

type EventResultCardProps = {
  runs: number | null;
  dropsPerRun: number | null;
  error: string | null;
  title: string;
  titleImage: string | React.ReactNode;
  desc: string;
  dropImage: string | React.ReactNode;
  loading: boolean;
};

function EventResultCard({
  runs,
  dropsPerRun,
  error,
  title,
  titleImage,
  desc,
  dropImage,
  loading,
}: EventResultCardProps) {
  const [showToast, setShowToast] = useState(false);
  function formatImageAlt(image: string) {
    let alt = image
      .split("/")
      .pop()
      ?.split(".")[0]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    if (alt?.includes("Icon")) return alt;

    alt = `${alt} Icon`;
    return alt;
  }

  function handleCopy(e: React.MouseEvent, value: number) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value.toString());
    setShowToast(true);
  }

  return (
    <div className="card card-border bg-base-300 text-neutral-content w-96 border-gray-400">
      <div className="card-body flex flex-col justify-between">
        <h2 className="card-title self-center">{title}</h2>
        <div className="flex flex-col my-2 items-center">
          {typeof titleImage === "string" ? (
            <img src={titleImage} alt={formatImageAlt(titleImage)} className=" w-20 h-20 mb-2" />
          ) : (
            titleImage
          )}
        </div>
        <div className="flex flex-col items-center justify-center h-42">
          <div className="text-gray-400 text-center">
            {runs === null ? (
              <>
                <div>No calculation yet.</div>
                <div className="text-sm mt-2">
                  {desc}, then click <strong>Calculate</strong>.<br />
                  <div className="mt-2 flex flex-col gap-1">
                    <span className="italic">
                      Example: Drops Per Run:{" "}
                      {typeof dropImage === "string" ? (
                        <img src={dropImage} className="inline w-4 h-4" alt={formatImageAlt(dropImage)} />
                      ) : (
                        dropImage
                      )}{" "}
                      1000
                    </span>
                    <span className="italic">
                      Example: Runs Needed: <Route className="inline-flex" size={16} /> 10
                    </span>
                  </div>
                </div>
              </>
            ) : loading ? (
              <span className="loading loading-infinity loading-xl"></span>
            ) : (
              <div className="flex flex-col items-center gap-4 mt-[-50px]">
                <div className="flex items-center gap-2 tooltip" data-tip="Runs Needed">
                  <label className="input input-ghost border-gray-400">
                    <Route />
                    <input type="text" className="grow text-primary text-lg" disabled readOnly value={runs} />
                    <div
                      className="cursor-pointer border-separator border-s-2 ps-2 flex"
                      onClick={(e) => handleCopy(e, runs!)}
                    >
                      <div className="tooltip tooltip-bottom" data-tip="Copy to clipboard">
                        <Copy />
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center gap-2 tooltip" data-tip="Drops Per Run">
                  <label className="input input-ghost border-gray-400">
                    {typeof dropImage === "string" ? (
                      <img src={dropImage} alt={formatImageAlt(dropImage)} className="w-5 h-5" />
                    ) : (
                      dropImage
                    )}
                    <input type="text" className="grow text-primary text-lg" disabled readOnly value={dropsPerRun!} />
                    <div
                      className="cursor-pointer border-separator border-s-2 ps-2 flex"
                      onClick={(e) => handleCopy(e, dropsPerRun!)}
                    >
                      <div className="tooltip tooltip-bottom" data-tip="Copy to clipboard">
                        <Copy />
                      </div>
                    </div>
                  </label>
                  {showToast && <Toast onClose={() => setShowToast(false)} />}
                </div>
                <div>
                  <span className="text-gray-400 text-sm">If you found a mistake, please let us know.</span>
                </div>
              </div>
            )}
          </div>
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default EventResultCard;
