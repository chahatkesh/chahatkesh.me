import { createId } from "@paralleldrive/cuid2";

// Project cover images
import webmark from "~/assets/images/projects/webmark.png";

const projects = [
  {
    id: createId(),
    title: `Webmark`,
    description:
      "A full-stack bookmark management solution for organizing and categorizing Web links.",
    stacks: ["React.js", "Tailwind CSS", "Node.js", "MongoDB", "Radix UI"],
    cover: webmark,
    isRepo: true,
    repoUrl: "https://github.com/chahatkesh/webmark",
    deployedURL: "https://webmark.site/",
  },
];

export default projects;
export type TProject = (typeof projects)[0];
