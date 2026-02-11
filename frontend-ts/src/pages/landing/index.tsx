import Navbar from "@/components/ui/navbar";
import CapabilitiesSection from "./sections/capabilities";
import CTASection from "./sections/cta";
import Hero from "./sections/hero";
import TokenomicsSection from "./sections/tokenomics";
import Footer from "@/components/ui/footer";


export default function Landing() {

    return (
        <>
            <Navbar />
            <Hero />
            <TokenomicsSection />
            <CapabilitiesSection />
            <CTASection />
            <Footer />
        </>
    );
}
