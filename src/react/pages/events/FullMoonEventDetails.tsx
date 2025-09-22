import { useState } from "react";
import { fullMoonTable } from "@utils/events/event";
import { FullMoonDraken } from "@utils/events/FullMoonItems";
import EventTips from "@components/EventTips";

function FullMoonEventDetails() {
  const [tablePage, setTablePage] = useState(1);
  const [uiState, setUiState] = useState<"80" | "100">("100");

  const currentPageItems = fullMoonTable.items.filter((item) => item.page === tablePage);

  const totalPages = [...new Set(fullMoonTable.items.map((item) => item.page))].sort((a, b) => a - b);

  return (
    <div className="flex flex-col gap-6 min-h-screen items-center mt-20 mb-10">
      <div className="flex items-center gap-4">
        <img src="/src/react/assets/events/fullmoon/tabicon_fullmoon.png" alt="Full Moon" />
        <h1 className="text-3xl font-bold text-primary">Full Moon Event Details</h1>
      </div>

      <div>
        <p className="text-center max-w-2xl">{fullMoonTable.description}</p>
      </div>

      <div className="flex gap-4">
        <button
          className={`btn btn-sm ${uiState === "80" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setUiState("80")}
        >
          Between level 20 and 80
        </button>
        <button
          className={`btn btn-sm ${uiState === "100" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setUiState("100")}
        >
          Between level 80 and 100
        </button>
      </div>

      <div className="overflow-x-auto rounded-box w-full border border-base-content/5 bg-base-100">
        {uiState === "100" ? (
          <>
            <div className="flex items-center justify-center py-3">
              <img src="/src/react/assets/coins/draken.png" alt="Draken" className="w-10 h-10" />
              {FullMoonDraken} total
            </div>
            <div className="flex justify-center items-center gap-2 p-4 border-b border-base-content/10">
              <span className="text-sm text-base-content/70">Page:</span>
              {totalPages.map((page) => (
                <button
                  key={page}
                  className={`btn btn-sm ${tablePage === page ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setTablePage(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <table className="table table-zebra ">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Quantity</th>
                  <th>Name</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {currentPageItems.map((item, index) => (
                  <tr key={index}>
                    <th>{<img src={item.icon} alt={item.name} className="w-15 h-15" />}</th>
                    <td>{item.amount}</td>
                    <td>{item.name}</td>
                    <td>{item.progress}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center items-center gap-2 p-4 border-b border-base-content/10">
              <span className="text-sm text-base-content/70">Page:</span>
              {totalPages.map((page) => (
                <button
                  key={page}
                  className={`btn btn-sm ${tablePage === page ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setTablePage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-400">WIP.</p>
          </div>
        )}
      </div>
      <EventTips tips={fullMoonTable.eventTips} title="Full Moon Event Tips" />
    </div>
  );
}

export default FullMoonEventDetails;
