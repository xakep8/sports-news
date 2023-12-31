import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";

const Account = () => {
    return (
        <>
            <Appbar />
            <main className="flex items-center overflow-y-hidden justify-center w-full h-full">
                <div className="mx-auto w-screen overflow-x-hidden py-6 sm:px-6 lg:px-8 h-full">
                    <Outlet />
                </div>
            </main>
        </>
    )
}
export default Account;