import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ShimmerType {
  className?: string;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  rounded?: string;
}

export const Skeleton = ({ className = "", children }: ShimmerType) => (
  <div
    className={cn(
      "relative overflow-hidden bg-gray-300 dark:bg-gray-700 rounded-md w-full h-full",
      className
    )}>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent"
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{
        repeat: Infinity,
        duration: 1.2,
        ease: "linear",
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
    {children && children}
  </div>
);