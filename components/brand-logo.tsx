import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type BrandLogoMarkProps = ComponentPropsWithoutRef<"span">;

export function BrandLogoMark({ className, ...props }: BrandLogoMarkProps) {
  return (
    <span
      {...props}
      className={cn(
        "relative inline-grid shrink-0 place-items-center overflow-hidden rounded-lg",
        className,
      )}
    >
      <Image
        src="/brand/yantrix-logo-dark.svg"
        alt=""
        aria-hidden="true"
        width={182}
        height={177}
        className="size-full object-contain dark:hidden"
        priority
      />
      <Image
        src="/brand/yantrix-logo-light.svg"
        alt=""
        aria-hidden="true"
        width={182}
        height={177}
        className="hidden size-full object-contain dark:block"
        priority
      />
    </span>
  );
}
