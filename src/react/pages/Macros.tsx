import { Play } from "lucide-react";
import MacroManager from "@components/MacroManager";

function Macros() {
  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      <div className="flex gap-4 items-center">
        <Play className="h-8 w-8 text-primary" />
        <h1 className="text-4xl text-primary font-bold">Macro Management</h1>
      </div>

      <div className="w-full max-w-7xl px-4">
        <p className="text-lg text-error font-bold italic">
          All the macros here should be explicitly tested that they work as intended. Any issues should be reported to
          the maintainer. If any item is lost or sold unintentionally nor the maintainer is not responsible neither you
          can contact Drakensang Online's support to recover them. Please make sure you understand how the macros work
          before using them.
        </p>
      </div>

      <div className="w-full max-w-7xl">
        <MacroManager />
      </div>
    </div>
  );
}

export default Macros;
