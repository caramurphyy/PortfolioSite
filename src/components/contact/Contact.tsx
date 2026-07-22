import PortfolioPic from "@/assets/PortfolioPic.png";

function Contact() {
  return (
    <div className="flex flex-col items-center justify-start">
      <img
        src={PortfolioPic}
        alt="Cara in a yellow top looking at the camera with a slight smile in a restaurant with ornate european detailing."
        className="w-120 hidden md:block"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default Contact;
