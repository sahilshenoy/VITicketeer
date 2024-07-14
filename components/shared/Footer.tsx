import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/assets/images/VITicketeerLogoFinal.png"
            alt="logo"
            width={150}
            height={40}
          />
        </Link>

        <p>
          2024 VITicketeer. All Rights reserved. Made by Sahil Shenoy & Dhwani
          Budhiraja
        </p>
      </div>
    </footer>
  );
};

export default Footer;
