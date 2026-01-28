"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function CardFlip({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  children: [React.ReactNode, React.ReactNode];
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [front, back] = React.Children.toArray(children);

  return (
    <div
      className={cn("relative w-full cursor-pointer", className)}
      style={{ 
        perspective: "1000px",
        WebkitPerspective: "1000px"
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      {...props}
    >
      <motion.div
        className="relative w-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ 
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d"
        }}
      >
        {/* Front */}
        <motion.div 
          className="w-full" 
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(1px)"
          }}
          animate={{ opacity: isFlipped ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {front}
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)",
            WebkitTransform: "rotateY(180deg) translateZ(1px)"
          }}
          animate={{ opacity: isFlipped ? 1 : 0 }}
          transition={{ duration: 0.3, delay: isFlipped ? 0.3 : 0 }}
        >
          {back}
        </motion.div>
      </motion.div>
    </div>
  );
}

function CardFlipFront({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-xl overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

function CardFlipBack({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white/30 text-white flex flex-col gap-6 rounded-xl py-6 backdrop-blur-sm h-full overflow-y-auto",
        className
      )}
      {...props}
    />
  );
}

function CardFlipHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardFlipTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardFlipDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardFlipAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardFlipContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFlipFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  CardFlip,
  CardFlipFront,
  CardFlipBack,
  CardFlipHeader,
  CardFlipFooter,
  CardFlipTitle,
  CardFlipAction,
  CardFlipDescription,
  CardFlipContent,
};