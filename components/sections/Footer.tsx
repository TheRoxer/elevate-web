import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-16 sm:mt-24 max-w-[1200px] w-full px-4 sm:px-0">
      <hr className="w-full h-[3px]" />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mt-6 sm:mt-8 mx-4">
        <p className="text-[#6f6c85] text-sm sm:text-base text-center sm:text-left">
          © 2024 Elevate. All rights reserved.
        </p>
        <div className="flex gap-3 sm:gap-4">
          <a href="#" className=" hover:text-[#ff4c60]">
            <Image
              src="/icons/socials/discord.svg"
              width={20}
              height={20}
              alt="icon"
            />
          </a>

          <a href="#" className="text-[#6f6c85] hover:text-[#ff4c60]">
            <Image
              src="/icons/socials/linkedin.svg"
              width={20}
              height={20}
              alt="icon"
            />
          </a>

          <a href="#" className="text-[#6f6c85] hover:text-[#ff4c60]">
            <Image
              src="/icons/socials/instagram.svg"
              width={20}
              height={20}
              alt="icon"
            />
          </a>
          <a href="#" className="text-[#6f6c85] hover:text-[#ff4c60]">
            <Image
              src="/icons/socials/twitter.svg"
              width={20}
              height={20}
              alt="icon"
            />
          </a>
          <a href="#" className="text-[#6f6c85] hover:text-[#ff4c60]">
            <Image
              src="/icons/socials/youtube.svg"
              width={20}
              height={20}
              alt="icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
