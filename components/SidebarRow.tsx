import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

interface SidebarRowProps {
  Icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
  title: string;
  onClick?: () => {};
}

const SidebarRow = ({ Icon, title, onClick }: SidebarRowProps) => {
  return (
    <div
      onClick={() => onClick?.()}
      className="group flex max-w-fit cursor-pointer items-center space-x-2 px-4 py-3 rounded-full hover:bg-gray-100  transition-all duration-300"
    >
      <Icon className="h-6" />
      <p className="group-hover:text-twitterBlue hidden md:inline-flex text-base font-light lg:text-xl">
        {title}
      </p>
    </div>
  );
};

export default SidebarRow;
