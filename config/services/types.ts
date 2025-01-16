export interface ServiceContent {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	imageAlt: string;
	link: string;
	reverse?: boolean;
	backgroundColor?: string;
}

export interface Service {
	id: string;
	title: string;
	description: string;
	sections: ServiceContent[];
	features?: string[];
}
