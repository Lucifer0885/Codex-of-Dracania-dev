import { desertOfEssencesTable } from "@utils/events/event";
import EventTips from "@components/EventTips";
import { DesertOfEssencesDraken } from "@utils/events/DesertOfEssencesItems";
import { ImageExporter } from "@utils/ImageExporter";

function DesertofEssencesEventDetails() {
  return (
    <div className="flex flex-col gap-6 min-h-screen items-center mt-20 mb-10">
      <div className="flex items-center gap-4">
        <img src={ImageExporter.tabIconDoe} alt="Desert of Essences" />
        <h1 className="text-3xl font-bold text-primary">Desert of Essences Event Details</h1>
      </div>

      <div>
        <p className="text-center max-w-2xl">{desertOfEssencesTable.description}</p>
      </div>

      <div className="overflow-x-auto rounded-box w-full border border-base-content/5 bg-base-100">
        <div className="flex items-center justify-center py-3">
          <img src={ImageExporter.draken} alt="Draken" className="w-10 h-10" />
          {DesertOfEssencesDraken} total
        </div>
        <div className="text-sm text-gray-400 flex justify-center italic">
          Yes you get only drakens from the progress bar
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
            {desertOfEssencesTable.items[0].map((item, index) => (
              <tr key={index}>
                <th>{<img src={item.icon} alt={item.name} className="w-15 h-15" />}</th>
                <td>{item.amount}</td>
                <td>{item.name}</td>
                <td>{item.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EventTips tips={desertOfEssencesTable.eventTips} title="Desert of Essences Event Tips" />
    </div>
  );
}

export default DesertofEssencesEventDetails;
