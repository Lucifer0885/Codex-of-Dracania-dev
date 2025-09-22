import { useState } from "react";
import { fullMoonTable } from "@utils/events/event";

function FullMoonEventDetails() {
  const [tablePage, setTablePage] = useState(1);
  const [level, setLevel] = useState(1);
  return (
    <div className="flex flex-col gap-6 min-h-screen items-center mt-20">
      <div className="flex items-center gap-4">
        <img src="/src/react/assets/events/event.png" alt="Full Moon" />
        <h1 className="text-3xl font-bold text-primary">Full Moon Event Details</h1>
      </div>

      <div className="overflow-x-auto rounded-box w-full border border-base-content/5 bg-base-100">
        <table className="table table-zebra ">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FullMoonEventDetails;
