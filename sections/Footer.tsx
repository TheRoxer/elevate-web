import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-24">
      <hr className="w-[1200px] h-[3px]" />
      <div className="flex justify-between mt-8 mx-4">
        <p className="text-[#6f6c85]">© 2024 Elevate. All rights reserved.</p>
        <div className="flex gap-3 ">
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
