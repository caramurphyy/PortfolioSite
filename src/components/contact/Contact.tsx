import WavyButton from "@/components/ui/wavy-button";
import PortfolioPhoto from "@/assets/PortfolioPhoto.svg";

function Contact() {
  return (
    <div className="flex flex-col items-center justify-start">
      <img src={PortfolioPhoto} alt="Cara looking off to the side smiling in front of a painting in a museum in Budapest" className="w-100 hidden md:block" />
      <a href="https://www.instagram.com/caramurphyart?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
        <WavyButton variant="default" size="sm">
          Contact
        </WavyButton>
      </a>
    </div>
  );
}

export default Contact;

