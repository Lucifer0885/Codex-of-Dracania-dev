import { Gift, History } from "lucide-react";
import type { IBonusCode } from "@interfaces/IBonusCode";
import { useState, useEffect } from "react";
import { formatDate } from "@utils/utils";
import { useNavigate } from "react-router";
import React from "react";
import { calculateProgress, getProgressColor } from "@utils/bonusCode";

function BonusCodes() {
  const [bonusCodes, setBonusCodes] = useState<IBonusCode[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await window.electron.getActiveBonusCodes();
      console.log("Active Bonus Codes:", data);
      setBonusCodes(data);
    };
    fetchData();
  }, []);

  return (
    <div className="mb-4 p-4 bg-base-200 rounded-lg gap-4 flex flex-col min-h-screen mt-20">
      <div className="flex justify-between gap-4 items-center h-12">
        <div className="flex items-center gap-4">
          <Gift className="h-8 w-8 text-primary" />
          <h1 className="text-4xl text-primary font-bold">Bonus Codes</h1>
        </div>
        <History
          className="h-6 w-6 text-secondary hover:cursor-pointer"
          onClick={() => navigate(`/bonus-codes/history`)}
        />
      </div>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Code</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Progress</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {bonusCodes.map((code) => {
            const progress = calculateProgress(code.startDate, code.endDate);
            const progressColor = getProgressColor(progress);
            return (
              <React.Fragment key={code.id}>
                <tr
                  onClick={() => navigate(`/bonus-codes/${code.id}`)}
                  className="cursor-pointer hover:bg-base-300 transition-colors"
                >
                  <td>{code.name}</td>
                  <td>{formatDate(code.startDate)}</td>
                  <td>{formatDate(code.endDate)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <progress className={`progress ${progressColor} w-48`} value={progress} max="100"></progress>
                      <span className="text-sm font-semibold">{progress}%</span>
                    </div>
                  </td>
                  <td>{code.active ? "Yes" : "No"}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BonusCodes;
