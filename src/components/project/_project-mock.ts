import { createId } from "@paralleldrive/cuid2";

// Project cover images
import webmark from "~/assets/images/projects/webmark.png";

const projects = [
	{
		id: createId(),
		title: `Webmark`,
		slug: "webmark",
		description:
			"A full-stack bookmark management solution for organizing and categorizing Web links.",
		stacks: ["React.js", "Tailwind CSS", "Node.js", "MongoDB", "Radix UI"],
		cover: webmark,
		isRepo: true,
		repoUrl: "https://github.com/chahatkesh/webmark",
		deployedURL: "https://webmark.site/",
		datePublished: "2024-01-15",
		dateModified: "2024-05-20",
	},
];

export default projects;
export type TProject = (typeof projects)[0];
