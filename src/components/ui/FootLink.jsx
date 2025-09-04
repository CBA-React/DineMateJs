import { Link } from "react-router-dom";

export const FootLink = ({ href = '#', children }) => {
    return (
      <Link
        to={href}
        className="relative pl-5 font-medium leading-7 text-primary-text hover:text-primary transition
                   before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2
                   before:text-primary before:content-['›'] before:text-[20px]"
      >
        {children}
      </Link>
    );
  }