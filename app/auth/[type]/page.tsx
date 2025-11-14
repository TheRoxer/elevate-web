import { Metadata } from "next";
import { LoginForm } from "@/components/sections/Login";
import { SignupForm } from "@/components/sections/Signup";

export const metadata: Metadata = {
  title: "Elevate | Auth",
  description: "Elevate your business with our services",
};

const Panel = ({ params }: { params: any }) => {
  return (
    <main className="flex justify-center items-center h-screen">
      {params.type === "signup" ? (
        <SignupForm />
      ) : params.type === "signin" ? (
        <LoginForm />
      ) : null}
    </main>
  );
};

export default Panel;
