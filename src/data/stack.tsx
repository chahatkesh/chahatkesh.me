import { IconType } from "react-icons/lib";
import { FaGithub, FaAws, FaDocker, FaGit } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import { 
  SiCplusplus,
  SiRadixui,
  SiC, 
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiChakraui,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiOpenai,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGithubactions,
  SiGooglecloud,
  SiLangchain,
  SiSlack,
  SiNotion,
  SiFigma,
  SiVite,
  SiStripe,
  SiJsonwebtokens,
  SiCloudinary,
  SiMongoose,
  SiAxios
} from "react-icons/si";
import { TbApi, TbBrandFramerMotion } from "react-icons/tb";
import { DiDatabase } from "react-icons/di";
import { BsRobot, BsVectorPen } from "react-icons/bs";

export type stacksProps = Record<
  string,
  {
    Icon: IconType;
    className: string;
  }
>;

export const LANGUAGES_TOOLS: stacksProps = {
  "C++": { Icon: SiCplusplus, className: "text-blue-500" },
  C: { Icon: SiC, className: "text-sky-400" },
  Python: { Icon: SiPython, className: "text-yellow-300" },
  JavaScript: { Icon: SiJavascript, className: "text-yellow-400" },
  TypeScript: { Icon: SiTypescript, className: "text-blue-400" },
  Git: { Icon: FaGit, className: "text-orange-600" },
  GitHub: { Icon: FaGithub, className: "text-neutral-300" },
  Slack: { Icon: SiSlack, className: "text-purple-600" },
  Notion: { Icon: SiNotion, className: "text-neutral-300" },
  VSCode: { Icon: VscCode, className: "text-blue-500" },
  Figma: { Icon: SiFigma, className: "text-pink-500" },
};

export const FRONTEND_STACKS: stacksProps = {
  "HTML5": { Icon: SiHtml5, className: "text-orange-500" },
  "CSS3": { Icon: SiCss3, className: "text-blue-500" },
  "React.js": { Icon: SiReact, className: "text-sky-500" },
  "Next.js": { Icon: SiNextdotjs, className: "text-neutral-400" },
  "Vite": { Icon: SiVite, className: "text-purple-500" },
  "Tailwind CSS": { Icon: SiTailwindcss, className: "text-cyan-300" },
  "Chakra UI": { Icon: SiChakraui, className: "text-teal-500" },
  "Shadcn UI": { Icon: SiNextdotjs, className: "text-neutral-200" },
  "Aceternity UI": { Icon: SiFramer, className: "text-purple-400" },
  "Framer Motion": { Icon: TbBrandFramerMotion, className: "text-purple-500" },
  "React Toastify": { Icon: SiReact, className: "text-yellow-400" },
  "GitHub API": { Icon: FaGithub, className: "text-neutral-300" },
  "Retrieval-Augmented Generation": { Icon: BsRobot, className: "text-rose-500" },
  "Radix UI": { Icon: SiRadixui, className: "text-rose-500" },
};

export const BACKEND_DEVOPS: stacksProps = {
  "Node.js": { Icon: SiNodedotjs, className: "text-green-600" },
  "Express.js": { Icon: SiExpress, className: "text-neutral-400" },
  MongoDB: { Icon: SiMongodb, className: "text-green-500" },
  Mongoose: { Icon: SiMongoose, className: "text-red-500" },
  Cloudinary: { Icon: SiCloudinary, className: "text-green-500" },
  "REST APIs": { Icon: TbApi, className: "text-blue-400" },
  Axios: { Icon: SiAxios, className: "text-blue-600" },
  PostgreSQL: { Icon: SiPostgresql, className: "text-blue-500" },
  MySQL: { Icon: SiMysql, className: "text-blue-600" },
  Docker: { Icon: FaDocker, className: "text-blue-400" },
  "GitHub Actions": { Icon: SiGithubactions, className: "text-neutral-300" },
  AWS: { Icon: FaAws, className: "text-orange-400" },
  GCP: { Icon: SiGooglecloud, className: "text-red-400" },
  "Third-Party Integrations": { Icon: TbApi, className: "text-rose-400" },
    SQL: { Icon: DiDatabase, className: "text-blue-400" },
  "RESTful APIs": { Icon: TbApi, className: "text-blue-400" },
  "OpenAI API": { Icon: SiOpenai, className: "text-teal-500" },
  LangChain: { Icon: SiLangchain, className: "text-teal-500" },
  "Vector Databases": { Icon: BsVectorPen, className: "text-purple-500" },
  "Stripe": { Icon: SiStripe, className: "text-purple-600" },
  "JWT": { Icon: SiJsonwebtokens, className: "text-pink-500" },
};
