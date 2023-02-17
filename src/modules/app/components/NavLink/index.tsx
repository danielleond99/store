import { FC, ReactElement } from 'react';
import { NavLink as DomNavLink } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  end?: boolean;
  icon?: string;
  label?: string;
  labelStyle?: string;
  className?: string;
}

export const NavLink: FC<NavLinkProps> = ({
  end,
  to,
  label,
  labelStyle,
  icon,
  className,
}): ReactElement => {
  return (
    <DomNavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${
          isActive ? 'text-primary font-semibold' : 'text-color'
        } p-button-text hover:text-primary px-2 no-underline ${className}`
      }
    >
      <i className={`${icon}`}></i>
      <span className={`ml-2 ${labelStyle}`}>{label}</span>
    </DomNavLink>
  );
};
