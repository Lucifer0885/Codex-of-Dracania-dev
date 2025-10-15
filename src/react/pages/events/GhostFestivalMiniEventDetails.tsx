import EventTips from "@components/EventTips";
import { ghostFestivalMiniTable } from "@utils/events/event";
import { GhostFestivalMiniDraken, GhostFestivalMiniTips } from "@utils/events/GhostFestivalItems";
import { ImageExporter } from "@utils/ImageExporter";
import { useState } from "react";

function GhostFestivalMiniEventDetails() {
  const [tablePage, setTablePage] = useState(1);

  const currentPageItems = ghostFestivalMiniTable.items[0].filter((item) => item.page === tablePage);

  const totalPages = [...new Set(ghostFestivalMiniTable.items[0].map((item) => item.page))].sort((a, b) => a - b);

  return (
    <div className="flex flex-col gap-6 min-h-screen items-center mt-20 mb-10">
      <div className="flex items-center gap-4">
        <img src={ImageExporter.tabIconGhostFestival} alt="Ghost Festival" />
        <h1 className="text-3xl font-bold text-primary">Return of the Dead Event Details</h1>
      </div>

      <div>
        <p className="text-center max-w-2xl">{ghostFestivalMiniTable.description}</p>
      </div>

      <div className="overflow-x-auto rounded-box w-full border border-base-content/5 bg-base-100">
        <div className="flex items-center justify-center py-3">
          <img src={ImageExporter.draken} alt="Draken" className="w-10 h-10" />
          {GhostFestivalMiniDraken} total
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
      </div>
      <EventTips tips={GhostFestivalMiniTips} title="Ghost Festival Event Tips" />
    </div>
  );
}

export default GhostFestivalMiniEventDetails;
