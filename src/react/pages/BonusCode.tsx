import { Gift } from "lucide-react";
import type { IBonusCode } from "@interfaces/IBonusCode";
import { useState, useEffect } from "react";
import { formatDate } from "@utils/utils";
import React from "react";

function BonusCode() {
  const [bonusCodes, setBonusCodes] = useState<IBonusCode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await window.electron.getActiveBonusCodes();
      console.log("Active Bonus Codes:", data);
      setBonusCodes(data);
    };
    fetchData();
  }, []);

  // Calculate progress percentage between start and end date
  const calculateProgress = (startDate: Date, endDate: Date): number => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = Date.now();

    if (now < start) return 0; // Event hasn't started yet
    if (now > end) return 100; // Event has ended

    const total = end - start;
    const elapsed = now - start;
    return Math.round((elapsed / total) * 100);
  };

  // Get progress bar color based on progress percentage
  const getProgressColor = (progress: number): string => {
    if (progress === 0) return "progress-info"; // Not started - blue
    if (progress < 25) return "progress-success"; // Just started - green
    if (progress < 75) return "progress-warning"; // Mid-way - yellow/orange
    if (progress < 100) return "progress-error"; // Ending soon - red
    return "progress-accent"; // Ended - accent color
  };

  return (
    <div className="mb-4 p-4 bg-base-200 rounded-lg gap-4 flex flex-col min-h-screen mt-20">
      <div className="flex justify-center gap-4 items-center h-12">
        <Gift className="h-8 w-8 text-primary" />
        <h1 className="text-4xl text-primary font-bold">Bonus Codes</h1>
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
                <tr>
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
                <tr></tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BonusCode;
