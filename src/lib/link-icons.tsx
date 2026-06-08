import {
  FaExternalLinkAlt,
  FaFileAlt,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaCertificate,
} from "react-icons/fa";
import { SiDevpost } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";

export type LinkIconType =
  | "github"
  | "website"
  | "demo"
  | "article"
  | "blog"
  | "certificate"
  | "youtube"
  | "devfolio"
  | "linkedin"
  | "instagram"
  | "twitter"
  | "document";

type IconSize = {
  default?: number;
  globe?: number;
  file?: number;
};

const DEFAULT_SIZES: Required<IconSize> = {
  default: 10,
  globe: 10,
  file: 10,
};

export const getLinkIcon = (iconType?: string, size?: IconSize) => {
  const iconSize = { ...DEFAULT_SIZES, ...size };

  switch (iconType) {
    case "github":
      return <FaGithub size={iconSize.default} />;
    case "website":
    case "demo":
      return <FaGlobe size={iconSize.globe} />;
    case "article":
    case "blog":
    case "document":
      return <FaFileAlt size={iconSize.file} />;
    case "certificate":
      return <FaCertificate size={iconSize.file} />;
    case "youtube":
      return <FaYoutube size={iconSize.default} />;
    case "devfolio":
      return <SiDevpost size={iconSize.default} />;
    case "linkedin":
      return <FaLinkedin size={iconSize.default} />;
    case "instagram":
      return <FaInstagram size={iconSize.default} />;
    case "twitter":
      return <BsTwitterX size={iconSize.default} />;
    default:
      return <FaExternalLinkAlt size={iconSize.default} />;
  }
};
