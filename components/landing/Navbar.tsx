import Image from "next/image";
import Button from "./Button";

const Navbar = () => {
  return (
    <div className="flex w-[1200px] justify-between items-center">
      <Image src="/images/logo.png" alt="logo" width={183} height={38}></Image>
      <ul className="flex justify-center items-center gap-5">
        <li>
          <a href="/#">Home</a>
        </li>
        <li>
          <a href="/#features">Features</a>
        </li>
        <li>
          <a href="/#stories">Our stories</a>
        </li>
        <li>
          <a href="/#opinions">Opinions</a>
        </li>
      </ul>

      <div className="flex justify-center items-center gap-[35px]">
        <Button href="https://example.com" unstyled>
          Panel
        </Button>
        <Button href="https://example.com">Learn More</Button>
      </div>
    </div>
  );
};

export default Navbar;
