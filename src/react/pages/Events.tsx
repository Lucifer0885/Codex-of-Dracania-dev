import { EventsList } from "@utils/events/event";
import { Link } from "react-router";
import { Trophy } from "lucide-react";
import { useState } from "react";

function Events() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredEvents = EventsList.filter((event) => event.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col gap-6 mt-10">
      <div className="flex justify-between items-center px-4">
        <h1 className="text-primary text-5xl flex gap-3 items-center">
          <Trophy className="inline mb-[-5px]" size={40} />
          Events
        </h1>
        <div>
          <label className="floating-label w-[300px]">
            <span>Search</span>
            <input
              type="text"
              placeholder="Search for an event..."
              className="input input-md border-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="flex "></div>
      <div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <li
              key={event.id}
              className="card card-border border-gray-300 bg-base-200 hover:transform hover:scale-105 transition-transform"
            >
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="card-title">{event.name}</h2>
                  <img src={event.image} alt={event.name} width={60} height={60} className="" />
                </div>
                <p className="">{event.description}</p>
                <div className="card-actions flex justify-end">
                  <Link to={`/events/${event.id}`} className="btn btn-outline btn-primary hover:bg-yellow-700">
                    Open Event
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

export default Events;
