import { Dialog, Transition } from "@headlessui/react";
import {Fragment,useContext,useEffect,useRef,useState} from "react";
import DropDown from "./Dropdown";
import { me } from "../context/user/actions";
import { setPreferences } from "../context/matches/actions";
import { getSports,getTeams } from "../context/sports/actions";
import { Sport, Sports } from "../types/sports";
import { Team } from "../types/matches";
import { UserContext } from "../context/user/user";

const fetchSports = async (setSports: (data: Sport[]) => void) => {
  const sports: Sports = await getSports();
  setSports(sports.sports);
};

const fetchTeams = async (setTeams: (data: Team[]) => void) => {
  const teams: Team[] = await getTeams();
  setTeams(teams);
};

function PreferencesDialog(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { open, setOpen } = props;
  const cancelButtonRef = useRef(null);

  const { user, setUser } = useContext(UserContext);
  const [sports, setSports] = useState<Sport[]>([]);
  const [selectedSports, setSelectedSports] = useState<Sport[]>(
    user?.preferences?.sports || []
  );
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>(
    user?.preferences?.teams || []
  );

  useEffect(() => {
    fetchSports(setSports);
    fetchTeams(setTeams);
  }, []);

  useEffect(() => {
    setSelectedSports(user?.preferences?.sports || []);
    setSelectedTeams(user?.preferences?.teams || []);
  }, [user]);

  const handleClick = async () => {
    const data = {
      sports: selectedSports,
      teams: selectedTeams,
    };
    await setPreferences({ preferences: data });
    const updatedUser = await me();
    setUser(updatedUser);
    setOpen(false);
  };

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-800 dark:bg-opacity-75 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 text-left shadow-xl transition-all sm:my-8 w-fit">
                  <div className="bg-white dark:bg-slate-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="flex w-full">
                          <div className="flex w-full justify-between items-start">
                            <div className="flex flex-col">
                              <Dialog.Title
                                as="h3"
                                className="font-serif text-3xl my-2 font-semibold leading-6 text-gray-900 dark:text-gray-100"
                              >
                                Preferences
                              </Dialog.Title>
                              <div className="flex gap-4 flex-wrap mt-4">
                                <div>
                                  <p className="text-gray-800 dark:text-gray-300 text-lg font-semibold">
                                    Selected Sports
                                  </p>
                                  <DropDown
                                    list={sports}
                                    selectedList={selectedSports}
                                    setSelectedCB={setSelectedSports}
                                  />
                                </div>
                                <div>
                                  <p className="text-gray-800 dark:text-gray-300 text-lg font-semibold">
                                    Selected Teams
                                  </p>
                                  <DropDown
                                    list={teams}
                                    selectedList={selectedTeams}
                                    setSelectedCB={setSelectedTeams}
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end gap-2 w-full">
                                <button
                                  onClick={() => setOpen(false)}
                                  className="text-gray-900 dark:text-gray-100 rounded-md bg-gray-400/60 dark:bg-gray-600/60 hover:bg-gray-400 dark:hover:bg-gray-600 p-2"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleClick}
                                  className="text-gray-900 dark:text-gray-100 rounded-md bg-green-400/60 dark:bg-green-600/60 hover:bg-green-400 dark:hover:bg-green-600 p-2"
                                >
                                  Save Preference
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default PreferencesDialog;