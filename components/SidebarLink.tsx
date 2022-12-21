"use client";
import { Settings, User, Grid, Calendar, Icon } from "react-feather";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const icons: Record<string, Icon> = { Settings, User, Grid, Calendar };
export interface ILink {
  label: string;
  icon: string;
  link: string;
}

interface SidebarLinkProps {
  link: ILink;
}

export const SidebarLink = ({ link }: SidebarLinkProps) => {
  const pathname = usePathname();
  let isActive = false;
  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};
export default SidebarLink;
