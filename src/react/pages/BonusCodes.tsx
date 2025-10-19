import { Gift, History } from "lucide-react";
import type { IBonusCode } from "@interfaces/IBonusCode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BonusCodeEntry from "@components/BonusCodeEntry";

function BonusCodes() {
  const [bonusCodes, setBonusCodes] = useState<IBonusCode[]>([]);
  const [filteredCodes, setFilteredCodes] = useState<IBonusCode[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await window.electron.getActiveBonusCodes();
      console.log("Active Bonus Codes:", data);
      setBonusCodes(data);
      setFilteredCodes(data);
    };
    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setFilteredCodes(bonusCodes);
      return;
    }
    const filtered = bonusCodes.filter((code: IBonusCode) =>
      code.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCodes(filtered);
  };

  return (
    <div className="mb-4 p-4 bg-base-200 rounded-lg gap-4 flex flex-col min-h-screen mt-20">
      <div className="flex justify-between gap-4 items-center h-12">
        <div className="flex items-center gap-4">
          <Gift className="h-8 w-8 text-primary" />
          <h1 className="text-4xl text-primary font-bold">Bonus Codes</h1>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search for bonus code..."
            className="input border-none focus-within:outline-primary bg-base-300"
            onChange={(event) => handleSearch(event)}
          />
          <History
            className="h-6 w-6 text-secondary hover:cursor-pointer"
            onClick={() => navigate(`/bonus-codes/history`)}
          />
        </div>
      </div>
      {filteredCodes.length > 0 ? (
        <BonusCodeEntry bonusCodes={filteredCodes} />
      ) : (
        <p className="text-center text-gray-500">No active bonus codes available.</p>
      )}
    </div>
  );
}

export default BonusCodes;
