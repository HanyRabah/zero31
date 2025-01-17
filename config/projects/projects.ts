import { Project } from "./types";

export const projects: Record<string, Project> = {
	"sherif-hamdy-stone-park": {
		id: "1803-SH",
		clientName: "Sherif Hamdy",
		heroImage: "/images/work/stone-park.jpg",
		heroImageAlt: "Stone Park",
		thumbnail: "/images/work/stone-park.jpg",
		thumbnailAlt: "Stone Park",
		description:
			"This luxurious villa, designed for a large family, combines spacious living areas, private suites, and premium amenities. The layout ensures both privacy and connection, featuring high-end finishes, entertainment zones, and wellness spaces. It offers a blend of elegance and practicality, creating a lavish yet comfortable environment for family living..",
		type: "Residential",
		scope: ["Landscape", "Interior Design", "Architecture", "Ff&e"],
		location: "Stone Park",
		area: "Cairo East",
		year: "2018",
		sections: [
			{
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus congue sit amet felis a tincidunt. Fusce tincidunt dolor ac nulla commodo, eu laoreet tortor rutrum.",
				images: ["/images/work/new-giza-residence.jpg"],
				imagesAlt: ["Full turn-key solutions"],
				backgroundColor: "bg-white",
			},
		],
	},
};
