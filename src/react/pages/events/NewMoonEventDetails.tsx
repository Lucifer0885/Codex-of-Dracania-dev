import { useState } from "react";
import { newMoonTable } from "@utils/events/event";
import { NewMoonDraken1, NewMoonDraken2 } from "@utils/events/NewMoonItems";
import EventTips from "@components/EventTips";
import { ImageExporter } from "@utils/ImageExporter";

function NewMoonEventDetails() {
  const [uiState, setUiState] = useState<"80" | "100">("100");

  return (
    <div className="flex flex-col gap-6 min-h-screen items-center mt-20 mb-10">
      <div className="flex items-center gap-4">
        <img src={ImageExporter.tabIconNewmoon} alt="New Moon" />
        <h1 className="text-3xl font-bold text-primary">New Moon Event Details</h1>
      </div>

      <div>
        <p className="text-center max-w-2xl">{newMoonTable.description}</p>
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
              <img src={ImageExporter.draken} alt="Draken" className="w-10 h-10" />
              {NewMoonDraken2} total
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
                {newMoonTable.items[1].map((item, index) => (
                  <tr key={index}>
                    <th>{<img src={item.icon} alt={item.name} className="w-15 h-15" />}</th>
                    <td>{item.amount}</td>
                    <td>{item.name}</td>
                    <td>{item.progress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center py-3">
              <img src={ImageExporter.draken} alt="Draken" className="w-10 h-10" />
              {NewMoonDraken1} total
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
                {newMoonTable.items[0].map((item, index) => (
                  <tr key={index}>
                    <th>{<img src={item.icon} alt={item.name} className="w-15 h-15" />}</th>
                    <td>{item.amount}</td>
                    <td>{item.name}</td>
                    <td>{item.progress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <EventTips tips={newMoonTable.eventTips} title="New Moon Event Tips" />
    </div>
  );
}

export default NewMoonEventDetails;
