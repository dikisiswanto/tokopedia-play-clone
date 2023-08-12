import { NavLink } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

export default function Header({ children }) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row w-full justify-between py-5">
      <NavLink
        to="/"
        className="inline-flex gap-2 items-center focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500"
      >
        <Avatar>
          <AvatarImage
            src="/play.png"
            alt="Tokopedia Play Clone"
            className="bg-transparent"
          ></AvatarImage>
          <AvatarFallback>TP</AvatarFallback>
        </Avatar>
        <h1 className="font-semibold text-xl tracking-wider">Tokopedia Play Clone</h1>
      </NavLink>
      {children}
    </header>
  );
}
