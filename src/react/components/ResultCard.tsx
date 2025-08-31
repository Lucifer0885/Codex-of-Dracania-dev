import { BadgeCheck, Copy } from "lucide-react";
import type React from "react";

type ResultCardProps = {
  upgradeCost: number | null;
  error: string | null;
  title: string;
  titleImage: string | React.ReactNode;
  desc: string;
  descImage: string | React.ReactNode;
  loading: boolean;
};

function ResultCard({ upgradeCost, error, title, titleImage, desc, descImage, loading }: ResultCardProps) {
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
            {upgradeCost === null ? (
              <>
                <p>No calculation yet.</p>
                <p className="text-sm mt-2">
                  {desc}, then click <strong>Calculate</strong>.<br />
                  <span className="italic">
                    Example: Upgrade Cost:{" "}
                    {typeof descImage === "string" ? (
                      <img src={descImage} className="inline w-4 h-4" alt={formatImageAlt(descImage)} />
                    ) : (
                      descImage
                    )}{" "}
                    100
                  </span>
                </p>
              </>
            ) : loading ? (
              <span className="loading loading-infinity loading-xl"></span>
            ) : (
              <div className="flex flex-col items-center gap-4 mt-[-50px]">
                <div className="flex gap-2 items-center ">
                  <span className="text-3xl text-info">Upgrade Cost</span>
                  <BadgeCheck className="text-info animate-pulse duration-300 " />
                </div>
                <div className="flex items-center gap-2">
                  <label className="input input-ghost border-gray-400">
                    {typeof descImage === "string" ? (
                      <img src={descImage} alt={formatImageAlt(descImage)} className="w-5 h-5" />
                    ) : (
                      descImage
                    )}
                    <input type="text" className="grow text-primary text-lg" disabled readOnly value={upgradeCost} />
                    <div
                      className="cursor-pointer border-separator border-s-2 ps-2 flex"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigator.clipboard.writeText(upgradeCost.toString());
                      }}
                    >
                      <div className="tooltip tooltip-bottom" data-tip="Copy to clipboard">
                        <Copy />
                      </div>
                    </div>
                  </label>
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

export default ResultCard;
