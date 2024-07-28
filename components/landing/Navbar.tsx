import Image from "next/image";
import Button from "./Button";

const Navbar = () => {
  return (
    <div className="flex w-[calc(100%+2rem)] justify-between items-center px-4">
      <Image
        src="/images/logo.png"
        alt="logo"
        width={183 * 1.2}
        height={38 * 1.2}
      ></Image>
      <ul className="flex justify-center items-center gap-5">
        <li>
          <a
            href="/#"
            className="text-white hover:text-color transition-colors duration-300"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/#features"
            className="text-white hover:text-color transition-colors duration-300"
          >
            Features
          </a>
        </li>
        <li>
          <a
            href="/#stories"
            className="text-white hover:text-color transition-colors duration-300"
          >
            Our stories
          </a>
        </li>
        <li>
          <a
            href="/#opinions"
            className="text-white hover:text-color transition-colors duration-300"
          >
            Opinions
          </a>
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
