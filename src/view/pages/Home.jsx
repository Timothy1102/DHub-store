import HeroSection from "../components/ui/HeroSection";
import PopularSection from "../components/ui/Popular-section/PopularSection";
import SellerSection from "../components/ui/Seller-section/SellerSection";
import Trending from "../components/ui/Trending-section/Trending";
import FeatureSection from "../components/ui/Feature-section/FeatureSection";

const Home = () => {

	return (
		<>
			<HeroSection />
			<FeatureSection />
			<PopularSection />
			<SellerSection />
			<Trending />
		</>
	);
};

export default Home;
