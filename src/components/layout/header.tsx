import AuthButton from "@/components/auth-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export function Header() {
  return (
    <header className="w-full flex justify-center ">
      <div className="flex justify-end fixed top-4 right-4">
        <AuthButton />
      </div>
      <div className="w-full max-w-[960px]">
        <Image
          src="/heavy_helms_header_drop_shadow.png"
          alt="Heavy Helms Header"
          width={960}
          height={320}
          className="w-full opacity-100"
          priority
        />
      </div>
    </header>
  );
}
