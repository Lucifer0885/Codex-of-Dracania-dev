import { Play } from "lucide-react";
import MacroManager from "@components/MacroManager";

function Macros() {
  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      <div className="flex gap-4 items-center">
        <Play className="h-8 w-8 text-primary" />
        <h1 className="text-4xl text-primary font-bold">Macro Management</h1>
      </div>

      <div className="w-full max-w-7xl">
        <MacroManager />
      </div>
    </div>
  );
}

export default Macros;
