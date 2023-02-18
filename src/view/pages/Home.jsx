import HeroSection from "../components/ui/HeroSection";
import LiveAuction from "../components/ui/Live-auction/LiveAuction";
import SellerSection from "../components/ui/Seller-section/SellerSection";
import Trending from "../components/ui/Trending-section/Trending";
import StepSection from "../components/ui/Step-section/StepSection";

const Home = () => {
	// promt metamask to connect with DHub
    window.ethereum.enable().then(function(accounts) {
        console.log('accounts: ', accounts);
    });

	return (
		<>
			<HeroSection />
			<StepSection />
			<LiveAuction />
			<SellerSection />
			<Trending />
		</>
	);
};

export default Home;
