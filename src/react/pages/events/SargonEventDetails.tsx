import { useState } from "react";
import { sargonTable } from "@utils/events/event";
import EventTips from "@components/EventTips";
import { getEventPages, getItemsPerPage } from "@utils/utils";
import { SargonDraken1, SargonDraken2, SargonDraken3, SargonDraken4, SargonDraken5 } from "@utils/events/SargonItems";
import { ImageExporter } from "@utils/ImageExporter";

function SargonEventDetails() {
  const [tablePage, setTablePage] = useState(1);
  const [uiState, setUiState] = useState<"54" | "84" | "99" | "100" | "100q">("100q");

  return (
    <div className="flex flex-col gap-6 min-h-screen items-center mt-20 mb-10">
      <div className="flex items-center gap-4">
        <img src={ImageExporter.tabIconSargon} alt="Sargon" />
        <h1 className="text-3xl font-bold text-primary">Terryfing Shadows - New Era Event Details</h1>
      </div>

      <div>
        <p className="text-center max-w-2xl">{sargonTable.description}</p>
      </div>

      <div className="flex gap-4">
        <button
          className={`btn btn-sm h-15 ${uiState === "54" ? "btn-primary" : "btn-outline"}`}
          onClick={() => {
            setUiState("54");
            setTablePage(1);
          }}
        >
          Between level 20 and 54
        </button>
        <button
          className={`btn btn-sm h-15 ${uiState === "84" ? "btn-primary" : "btn-outline"}`}
          onClick={() => {
            setUiState("84");
            setTablePage(1);
          }}
        >
          Between level 55 and 84
        </button>
        <button
          className={`btn btn-sm h-15 ${uiState === "99" ? "btn-primary" : "btn-outline"}`}
          onClick={() => {
            setUiState("99");
            setTablePage(1);
          }}
        >
          Between level 85 and 99
        </button>
        <button
          className={`btn btn-sm h-15 ${uiState === "100" ? "btn-primary" : "btn-outline"}`}
          onClick={() => {
            setUiState("100");
            setTablePage(1);
          }}
        >
          Level 100
        </button>
        <button
          className={`btn btn-sm flex flex-col h-15 gap-1 ${uiState === "100q" ? "btn-primary" : "btn-outline"}`}
          onClick={() => {
            setUiState("100q");
            setTablePage(1);
          }}
        >
          Level 100
          <span className="text-xs ml-1">(The Terrible is Back quest completed)</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-box w-full border border-base-content/5 bg-base-100">
        {uiState === "100q" ? (
          <>
            <div className="flex items-center justify-center py-3">
              <img src={ImageExporter.draken} alt="Draken" className="w-10 h-10" />
              {SargonDraken5} total
            </div>
            <div className="flex justify-center items-center gap-2 p-4 border-b border-base-content/10">
              <span className="text-sm text-base-content/70">Page:</span>
              {getEventPages(sargonTable.items[4]).map((page) => (
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
                {getItemsPerPage(sargonTable.items[4], tablePage).map((item, index) => (
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
              {getEventPages(sargonTable.items[4]).map((page) => (
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
        ) : uiState === "100" ? (
          <>
            <div className="flex items-center justify-center py-3">
              <img src={ImageExporter.draken} alt="Draken" className="w-10 h-10" />
              {SargonDraken4} total
            </div>
            <div className="flex justify-center items-center gap-2 p-4 border-b border-base-content/10">
              <span className="text-sm text-base-content/70">Page:</span>
              {getEventPages(sargonTable.items[3]).map((page) => (
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
                {getItemsPerPage(sargonTable.items[3], tablePage).map((item, index) => (
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
              {getEventPages(sargonTable.items[3]).map((page) => (
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
        ) : uiState === "99" ? (
          <>
            <div className="flex items-center justify-center py-3">
              <img src={ImageExporter.draken} alt="Draken" className="w-10 h-10" />
              {SargonDraken3} total
            </div>
            <div className="flex justify-center items-center gap-2 p-4 border-b border-base-content/10">
              <span className="text-sm text-base-content/70">Page:</span>
              {getEventPages(sargonTable.items[2]).map((page) => (
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
                {getItemsPerPage(sargonTable.items[2], tablePage).map((item, index) => (
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
              {getEventPages(sargonTable.items[2]).map((page) => (
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
        ) : uiState === "84" ? (
          <>
            <div className="flex items-center justify-center py-3">
              <img src={ImageExporter.draken} alt="Draken" className="w-10 h-10" />
              {SargonDraken2} total
            </div>
            <div className="flex justify-center items-center gap-2 p-4 border-b border-base-content/10">
              <span className="text-sm text-base-content/70">Page:</span>
              {getEventPages(sargonTable.items[1]).map((page) => (
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
                {getItemsPerPage(sargonTable.items[1], tablePage).map((item, index) => (
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
              {getEventPages(sargonTable.items[1]).map((page) => (
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
          <>
            <div className="flex items-center justify-center py-3">
              <img src={ImageExporter.draken} alt="Draken" className="w-10 h-10" />
              {SargonDraken1} total
            </div>
            <div className="flex justify-center items-center gap-2 p-4 border-b border-base-content/10">
              <span className="text-sm text-base-content/70">Page:</span>
              {getEventPages(sargonTable.items[0]).map((page) => (
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
                {getItemsPerPage(sargonTable.items[0], tablePage).map((item, index) => (
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
              {getEventPages(sargonTable.items[0]).map((page) => (
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
        )}
      </div>
      <EventTips tips={sargonTable.eventTips} title="Terryfing Shadows Event Tips" />
    </div>
  );
}

export default SargonEventDetails;
