import { IoHome, IoTv, IoSearchSharp } from "react-icons/io5";
import { BiSolidMoviePlay } from "react-icons/bi";

export const navigation = [
  {
    label : "TV Shows",
    href : 'tv',
    icon : <IoTv />
  },
  {
    label : "Movies",
    href : 'movie',
    icon: <BiSolidMoviePlay />
  }
];

export const mobileNavigation = [
  {
    label: "Home",
    href: '/',
    icon: <IoHome />
  },
  ...navigation,
  {
    label: "Search",
    href: '/search',
    icon: <IoSearchSharp />
  }
];