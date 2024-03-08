import { memo } from "react";

interface ListWrapperProps {
  children: React.ReactNode;
}

const ListWrapper = ({ children }: ListWrapperProps) => {
  return <li className="h-full w-[272px] shrink-0 select-none">{children}</li>;
};

export default memo(ListWrapper);
