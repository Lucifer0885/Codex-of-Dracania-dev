import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import type { IBonusCode } from "@interfaces/IBonusCode";
import { Gift } from "lucide-react";
import { calculateProgress, getProgressColor } from "@utils/bonusCode";

function BonusCode() {
  const { id } = useParams();
  const [bonusCode, setBonusCode] = useState<IBonusCode | null>(null);
  const bonusCodeId = useRef(id);

  const progBar = () => {
    if (!bonusCode) return null;
    const progress = calculateProgress(bonusCode.startDate, bonusCode.endDate);
    const progressColor = getProgressColor(progress);

    return (
      <>
        <div className="flex items-center gap-2">
          <progress className={`progress ${progressColor} w-full`} value={progress} max="100"></progress>
          <span className="text-sm font-semibold">{progress}%</span>
        </div>
        <div>
          <p>
            <strong>Code:</strong> {bonusCode.name}
          </p>
          <p>
            <strong>Description:</strong> {bonusCode.additionalInfo}
          </p>
          <p>
            <strong>Start Date:</strong> {new Date(bonusCode.startDate).toLocaleString()}
          </p>
          <p>
            <strong>End Date:</strong> {new Date(bonusCode.endDate).toLocaleString()}
          </p>
          <p>
            <strong>Active:</strong> {bonusCode.active ? "Yes" : "No"}
          </p>
        </div>
        <div>
          {bonusCode.rewards.map((reward, index) => (
            <div key={index}>
              <p>
                <strong>Reward {index + 1}:</strong> {reward.name}
              </p>
              <p>
                <strong>Amount:</strong> {reward.amount}
              </p>
              <img src={reward.icon} alt="vale kati" />
            </div>
          ))}
        </div>
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await window.electron.getBonusCode(bonusCodeId.current!);
      console.log("Bonus Code:", data);
      setBonusCode(data);
    };
    fetchData();
  }, []);

  return (
    <div className="mb-4 p-4 bg-base-200 rounded-lg gap-4 flex flex-col min-h-screen mt-20">
      <div className="flex items-center gap-4">
        <Gift className="h-8 w-8 text-primary" />
        <h1 className="text-4xl text-primary font-bold">Bonus Code Details</h1>
      </div>
      {bonusCode ? progBar() : <p>Loading...</p>}
    </div>
  );
}

export default BonusCode;
