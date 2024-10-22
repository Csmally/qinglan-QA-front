import MainContainer from "./components/MainContainer";
import RouterTabs from "./components/RouterTabs";
  
const MainPageView: React.FC = () => {
    return (
        <>
            <RouterTabs />
            <MainContainer />
        </>
    )
}

export default MainPageView;