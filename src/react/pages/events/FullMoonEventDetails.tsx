import { useState } from "react";
import { fullMoonTable } from "@utils/events/event";
import { FullMoonDraken1, FullMoonDraken2, FullMoonEventItems1 } from "@utils/events/FullMoonItems";
import EventTips from "@components/EventTips";
import { ImageExporter } from "@utils/ImageExporter";
import { Heart } from "lucide-react";

function FullMoonEventDetails() {
  const [tablePage, setTablePage] = useState(1);
  const [uiState, setUiState] = useState<"80" | "100">("100");

  const currentPageItems = fullMoonTable.items[1].filter((item) => item.page === tablePage);

  const totalPages = [...new Set(fullMoonTable.items[1].map((item) => item.page))].sort((a, b) => a - b);

  return (
    <div className="flex flex-col gap-6 min-h-screen items-center mt-20 mb-10">
      <div className="flex items-center gap-4">
        <img src={ImageExporter.tabIconFullmoon} alt="Full Moon" />
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
              <img src={ImageExporter.draken} alt="Draken" className="w-10 h-10" />
              {FullMoonDraken2} total
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
          <>
            <div className="flex items-center justify-center py-3">
              <img src={ImageExporter.draken} alt="Draken" className="w-10 h-10" />
              {FullMoonDraken1} total
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
                {FullMoonEventItems1.map((item, index) => (
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
      <EventTips tips={fullMoonTable.eventTips} title="Full Moon Event Tips" />
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold text-primary">How to unlock Bloodmoon over Varholm (2nd map)</h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p>
            Start off by grabbing <span className="font-bold text-secondary">Thabo</span>'s quest{" "}
            <span className="font-bold text-info">"Full Moon Rising 1/5"</span>.
          </p>
          <p>Simply follow the objectives for each quest.</p>
          <p className="italic text-gray-400">
            Keep in mind that you need to use 1 Vial of Werewolf Blood to defeat Vargulf and Silver Essence can be
            farmed in the Moonsilver Mine.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p>
            From <span className="font-bold text-secondary">Jon Sunlair</span> you will obtain the questline:{" "}
            <span className="font-bold text-info">"The Curse"</span>
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p>The questline has two states (During Full Moon/Not During Full Moon).</p>
          <p className="font-bold text-error text-xl">
            This means that you cannot complete the entire questline in a single Full Moon event!
          </p>
          <p>
            When the event is active you can do the "During Full Moon" quests, and when the event isn't active you can
            do the (Not During Full Moon) quests.
          </p>
          <p>
            Because of this, <span className="font-bold text-info">"The Curse"</span> questline will take 2 Full Moon
            events to finish and should therefore be started as soon as possible!
          </p>
          <p className="italic text-gray-400">
            <span className="font-bold text-warning">Side note:</span> When the event is active Varholm is taking place
            during the night, and the day when the event is not active
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p>
            After both the <span className="font-bold text-info">"Visions from the Past"</span> and{" "}
            <span className="font-bold text-info">"The Curse"</span> questlines are completed, you will be prompted with
            a new questline:{" "}
            <span className="font-bold text-info">"Bloodmoon" "Bloodmoon 1/3" and "Bloodmoon 2/3"</span> are pretty
            straight forward and only require you to talk to the NPCs around Varholm.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p>
            After completing <span className="font-bold text-info">"Bloodmoon 2/3"</span> you have to finish the{" "}
            <span className="font-bold text-info">"Shining Silver Essence"</span> quest from{" "}
            <span className="font-bold text-secondary">Jon Sunlair</span>. When completed it will grant you access to
            <span className="font-bold text-info">"Bloodmoon 3/3"</span>.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p>
            After accepting <span className="font-bold text-info">"Bloodmoon 3/3"</span> you are now able to go through
            the portal that leads to <span className="font-bold text-accent">"Bloodmoon over Varholm"</span>, after
            killing Vargulf.
          </p>
          <p className="italic text-gray-400">
            Remember that normal Silver Essence doesnt have an effect on the enemies nor the Bloodmage in Bloodmoon over
            Varholm, only Shining Silver Essences will deal damage to them!
          </p>
          <img src={ImageExporter.bloodmageGuide} alt="Bloodmage Guide" />
        </div>
        <div className="divider" />
        <div className="flex items-center gap-2">
          <Heart className="stroke-red-800" />
          <p className="text-xl">
            Special thanks to <span className="font-bold text-red-800">celszu</span> for making the guide above!
          </p>
        </div>
      </div>
    </div>
  );
}

export default FullMoonEventDetails;
