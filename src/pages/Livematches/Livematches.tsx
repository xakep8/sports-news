import React, { useContext, useEffect } from "react";
import { Match, Matches } from "../../types/matches";
import LiveGamesTile from "./Livematchestile";
import { getMatches } from "../../context/matches/actions";
import { UserContext } from "../../context/user/user";

const fetchMatches = async (setMatchesCB: (data: Matches) => void) => {
  const data: Matches = await getMatches();
  const sorted = data.matches.sort((a, b) => {
    return b.isRunning ? 1 : -1;
  });
  setMatchesCB({ matches: sorted });
};

function LiveGames() {
  const userData = useContext(UserContext);
  console.log("userData", userData);
  const [matches, setMatches] = React.useState<Matches>({ matches: [] });
  const [filteredMatches, setFilteredMatches] = React.useState<Match[]>([]);
  const [remainingMatches, setRemainingMatches] = React.useState<Match[]>([]);

  useEffect(() => {
    fetchMatches(setMatches);
  }, []);

  const filterMatches = () => {
    if (userData.user) {
      const userSports = userData.user.preferences.sports
        ? userData?.user?.preferences.sports.map((sport) => sport.name)
        : [];
      const userTeams = userData.user.preferences.teams
        ? userData?.user?.preferences.teams.map((team) => team.id)
        : [];
      const filtered = matches.matches.filter(
        (match) =>
          userSports.includes(match.sportName) ||
          userTeams.includes(match.teams[0].id || match.teams[1].id)
      );
      const remaining = matches.matches.filter(
        (match) =>
          !filtered.includes(match) &&
          (userData.user?.preferences.matches?.includes(match.id) ||
            match.isRunning)
      );
      setFilteredMatches(filtered);
      setRemainingMatches(remaining);
    }
  };

  useEffect(() => {
    filterMatches();
  }, [matches, userData]);

  return (
    <div className="w-full flex flex-col items-center px-4">
      <h1 className="text-4xl text-green-600 font-semibold text-left w-full ml-6 my-3 font-serif">
        Trending Games
      </h1>
      <div className="flex w-full gap-2 overflow-x-scroll scbar dark:scbard">
        {userData.user ? (
          <>
            {filteredMatches.map((match) => (
              <LiveGamesTile
                key={match.id}
                fav={true}
                isRunning={match.isRunning}
                id={match.id}
              />
            ))}
            {remainingMatches.map((match) => (
              <LiveGamesTile
                key={match.id}
                fav={false}
                isRunning={match.isRunning}
                id={match.id}
              />
            ))}
          </>
        ) : (
          <>
            {matches.matches.map((match) => (
              <LiveGamesTile
                key={match.id}
                fav={false}
                isRunning={match.isRunning}
                id={match.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default LiveGames;