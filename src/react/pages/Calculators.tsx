import { calculators } from "@utils/calculators";
import { Link } from "react-router";

function Calculators() {
  return (
    <div>
      <div>
        <h1>Calculators</h1>
      </div>
      <div>{/* TODO: Implement Search and Filter */}</div>
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.map((calculator) => (
            <li
              key={calculator.id}
              className="card card-border border-gray-300 bg-base-200 hover:transform hover:scale-105 transition-transform"
            >
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title">{calculator.name}</h2>
                  <img src={calculator.image} alt={calculator.name} width={60} height={60} className="" />
                </div>
                <p className="">{calculator.description}</p>
                <div className="card-actions flex justify-end">
                  <Link
                    to={`/calculators/${calculator.id}`}
                    className="btn btn-outline btn-primary hover:bg-yellow-700"
                  >
                    Open Calculator
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calculators;
