import { useContext, useEffect, useState } from "react";
import { Match } from "../../types/matches";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { getMatch, setPreferences } from "../../context/matches/actions";
import { PlayCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import Loading from "../../components/Loading";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../../context/user/user";
import { BookmarkSlashIcon } from "@heroicons/react/20/solid";
import { Preferences } from "../../types/user";
import { ThemeContext } from "../../context/theme";

const getCurrentMatch =
  (id: number) => async (setMatchCB: (data: Match) => void) => {
    const data: Match = await getMatch(id);
    console.log(data);
    setMatchCB(data);
  };

const updatePreferences = async (preferences: Preferences) => {
  await setPreferences({ preferences: preferences });
};

function LiveGamesTile(props: {
  id: number;
  fav: boolean;
  isRunning: boolean;
}) {
  const { user, setUser } = useContext(UserContext);
  const { id, fav, isRunning } = props;
  const [match, setMatch] = useState<Match>();
  const [saved, setSaved] = useState<boolean | null>(null);

  useEffect(() => {
    getCurrentMatch(id)(setMatch);
  }, [id]);

  useEffect(() => {
    if (saved === null) return;
    if (user) {
      updatePreferences(user.preferences);
    }
  }, [saved]);

  const saveMatch = () => {
    if (user && match) {
      if (user.preferences.matches?.includes(match.id)) {
        const newPreferences = {
          ...user.preferences,
          matches: user.preferences.matches.filter((id) => id !== match.id),
        };
        setUser({ ...user, preferences: newPreferences });
        setSaved(false);
      } else {
        const newPreferences = {
          ...user.preferences,
          matches: [...(user.preferences.matches || []), match.id],
        };
        setUser({ ...user, preferences: newPreferences });
        setSaved(true);
      }
    }
  };

  const refresh = () => {
    getCurrentMatch(id)(setMatch);
    console.log(match);
  };

  if (!match) {
    return (
      <div
        className="flex flex-col items-center justify-center p-4 rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-900 m-2 
    flex-grow-0 flex-shrink-0 w-64
    bg-white dark:bg-slate-700 dark:text-slate-300"
      >
        <Loading />
      </div>
    );
  }
  return (
    <div
      className="flex flex-col p-4 rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-900 m-2 
      flex-grow-0 flex-shrink-0 w-80
      bg-white dark:bg-slate-700 dark:text-slate-300"
    >
      <div className="font-bold text-lg mb-1 flex justify-between w-full">
        <span className="flex flex-col items-start">
          <div className="flex gap-4 text-green-500 font-normal items-center text-base">
            <div className="flex gap-1">
              {fav && (
                <span className="flex gap-1 items-center">
                  <StarIcon className="w-5 h-5 text-green-500" />
                  {"Favorite"}
                </span>
              )}
              {isRunning && (
                <span className="flex gap-1 items-center">
                  {<PlayCircleIcon className="w-5 h-5" />}Live
                </span>
              )}
            </div>
          </div>
        </span>
        <div className="flex gap-1">
          {user != null && (
            <button onClick={saveMatch}>
              {user?.preferences.matches?.includes(match.id) ? (
                <BookmarkSlashIcon className="w-5 h-5 hover:scale-110 text-green-500" />
              ) : (
                <BookmarkIcon className="w-5 h-5 hover:scale-110" />
              )}
            </button>
          )}
          <button>
            <ArrowPathIcon
              className="w-5 h-5 hover:scale-110"
              onClick={refresh}
            />
          </button>
        </div>
      </div>
      <div className="flex w-full justify-center text-xl font-extrabold">
        {match.sportName}
      </div>
      <p className="my-1">{match.location}</p>
      {Object.keys(match.score).map((key) => (
        <p key={key} className="flex w-full justify-between">
          <span>
            <b>{key}</b>
          </span>
          <span>{match.score[key as keyof Match]}</span>
        </p>
      ))}
    </div>
  );
}

export default LiveGamesTile;