"use client";

import { motion } from "framer-motion";
import { LoginForm } from "@/components/sections/Login";
import { SignupForm } from "@/components/sections/Signup";

const Panel = ({ params }: { params: any }) => {
  return (
    <main className="flex justify-center items-center h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {params.type === "signup" ? (
          <SignupForm />
        ) : params.type === "signin" ? (
          <LoginForm />
        ) : null}
      </motion.div>
    </main>
  );
};

export default Panel;
