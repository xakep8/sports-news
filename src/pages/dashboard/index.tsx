import LiveGames from "../Livematches/Livematches";
import ArticleList from "../articles";


const Dashboard=()=>{
    return(
        <>
            <div className="flex flex-col w-full justify-center">
                <LiveGames/>
                <ArticleList/>
            </div>
        </>
    )
}

export default Dashboard;