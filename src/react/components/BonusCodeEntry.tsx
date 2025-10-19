import React from "react";
import type { IBonusCode } from "@interfaces/IBonusCode";
import { calculateProgress, getProgressColor, isActive } from "@utils/bonusCode";
import { formatDate } from "@utils/utils";
import { useNavigate } from "react-router";

type BonusCodeEntryProps = {
  bonusCodes: IBonusCode[];
};

function BonusCodeEntry({ bonusCodes }: BonusCodeEntryProps) {
  const navigate = useNavigate();
  return (
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
                <td>{isActive(code.startDate, code.endDate) ? "Yes" : "No"}</td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export default BonusCodeEntry;
