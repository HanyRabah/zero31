import { Project } from "./types";

export const projects: Record<string, Project> = {
	"sherif-hamdy-stone-park": {
		id: "1803-SH",
		title: "Stone Park Residence",
		clientName: "Sherif Hamdy",
		heroImage: "/images/work/new-giza-residence.jpg",
		heroImageAlt: "Stone Park",
		thumbnail: "/images/work/new-giza-residence.jpg",
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
					"Iconic Branding, Luxury Experience, Premium Design, Modern Elegance, Bespoke Interiors, Sophisticated Display reflects the essence of high-end craftsmanship and exclusivity. Designed with precision, the showroom fuses modern elegance with brand storytelling, offering a premium retail environment for luxury connoisseurs.",
				images: ["/images/work/new-giza-residence.jpg"],
				imagesAlt: ["Full turn-key solutions"],
				backgroundColor: "bg-off-white",
			},
			{
				description: "",
				images: ["/images/work/new-giza-residence.jpg", "/images/work/new-giza-residence.jpg"],
				imagesAlt: ["Full turn-key solutions", "Full turn-key solutions"],
				backgroundColor: "bg-white",
			},
			{
				description: "",
				images: ["/images/work/new-giza-residence.jpg"],
				imagesAlt: ["Full turn-key solutions"],
				backgroundColor: "bg-novo-blue",
			},
		],
	},
};
