import { useParams, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import type { IBonusCode } from "@interfaces/IBonusCode";
import { Gift, Calendar, Clock, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { calculateProgress, getProgressColor, isActive } from "@utils/bonusCode";
import { ImageExporter } from "@utils/ImageExporter";
import { formatDate } from "@utils/utils";

function BonusCode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bonusCode, setBonusCode] = useState<IBonusCode | null>(null);
  const bonusCodeId = useRef(id);

  useEffect(() => {
    const fetchData = async () => {
      const data = await window.electron.getBonusCode(bonusCodeId.current!);
      console.log("Bonus Code:", data);
      setBonusCode(data);
    };
    fetchData();
  }, []);

  if (!bonusCode) {
    return (
      <div className="mb-4 p-4 bg-base-200 rounded-lg gap-4 flex flex-col min-h-screen mt-20">
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  const progress = calculateProgress(bonusCode.startDate, bonusCode.endDate);
  const progressColor = getProgressColor(progress);
  const active = isActive(bonusCode.startDate, bonusCode.endDate);

  return (
    <div className="mb-4 p-4 bg-base-200 rounded-lg gap-6 flex flex-col min-h-screen mt-20">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/bonus-codes")} className="btn btn-circle btn-ghost hover:bg-base-300">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <Gift className="h-8 w-8 text-primary" />
          <h1 className="text-4xl text-primary font-bold">Bonus Code Details</h1>
        </div>
        {active ? (
          <div className="badge badge-success gap-2 p-4">
            <CheckCircle className="h-4 w-4" />
            Active
          </div>
        ) : (
          <div className="badge badge-error gap-2 p-4">
            <XCircle className="h-4 w-4" />
            {progress === 0 ? "Not Started" : "Expired"}
          </div>
        )}
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Time Progress</h2>
          <div className="flex items-center gap-4">
            <progress className={`progress ${progressColor} w-full h-6`} value={progress} max="100"></progress>
            <span className="text-2xl font-bold min-w-[4rem] text-right">{progress}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4 text-primary">Code Information</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm opacity-70 uppercase font-semibold">Bonus Code</span>
                <div className="flex items-center gap-3">
                  <code className="bg-base-200 px-4 py-3 rounded-lg text-xl font-mono font-bold text-primary flex-1">
                    {bonusCode.name}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(bonusCode.name)}
                    className="btn btn-outline btn-primary py-6"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {bonusCode.additionalInfo && (
                <div className="flex flex-col gap-2">
                  <span className="text-sm opacity-70 uppercase font-semibold">Description</span>
                  <p className="text-base leading-relaxed">{bonusCode.additionalInfo}</p>
                </div>
              )}

              <div className="divider"></div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-success" />
                  <div className="flex flex-col">
                    <span className="text-sm opacity-70">Start Date</span>
                    <span className="font-semibold">{formatDate(bonusCode.startDate)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-error" />
                  <div className="flex flex-col">
                    <span className="text-sm opacity-70">End Date</span>
                    <span className="font-semibold">{formatDate(bonusCode.endDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4 text-primary">Rewards</h2>
            <div className="space-y-4">
              {bonusCode.rewards.map((reward, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
                >
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-lg bg-base-100 p-2">
                      <img
                        src={ImageExporter[reward.icon as keyof typeof ImageExporter]}
                        alt={reward.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{reward.name}</h3>
                  </div>
                  <div className="badge badge-primary badge-lg font-bold">x{reward.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button onClick={() => navigate("/bonus-codes")} className="btn btn-outline btn-primary">
          Back to Bonus Codes
        </button>
        {active && (
          <button onClick={() => {}} className="btn btn-primary">
            Redeem Code
          </button>
        )}
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm opacity-70 ">Redeem not implemented yet</p>
      </div>
    </div>
  );
}

export default BonusCode;
