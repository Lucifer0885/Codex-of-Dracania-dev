import { Link } from "react-router";

function Home() {
  return (
    <>
      <div className="flex flex-col h-full justify-center items-center gap-8 pt-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="text-5xl font-bold text-primary pt-16">
            <h1>Welcome to Codex of Dracania</h1>
          </div>
          <div className="text-lg text-gray-400">
            <p>Your one-stop solution for all Drakensang-related tools and resources.</p>
          </div>
        </div>
        <div>
          <img src="/src/react/assets/general/dragon-resting.png" alt="dragon-resting" className="w-[300px] h-auto" />
        </div>
        <div className="flex gap-6">
          <Link to="/inventory" className="text-lg btn btn-primary btn-outline w-[200px]">
            Explore our services
          </Link>
          <Link to="/thank-you" className="text-lg btn btn-dash btn-primary w-[200px]">
            Thank you
          </Link>
        </div>
        <div className="text-lg text-gray-400">Designed by gamers for gamers!</div>
      </div>
    </>
  );
}

export default Home;
