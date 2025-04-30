import ContactForm from "@/components/contact/ContactForm";
import { Metadata } from "next";
import { formatString } from "@/utils/StringUtils";
import ProjectByCategory from "@/components/projects/ProjectList/ProjectByCategory";
import Quote from "@/components/sections/Quote";
import { normalizeCategoryType } from "@/utils/urlParamHandler";
import { ProjectType } from "@prisma/client";

type Params = Promise<{ category: ProjectType['name'] }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { category } = await params;

	return {
		title: `Our Work - in ${category} Category`,
		description:"Explore our diverse portfolio of projects, showcasing our expertise and commitment to excellence in every endeavor.",
	};
}

export default async function ProjectPageByCategory({ params }: { params: Params }) {
	const { category } = await params;
	const normalizedCategory = normalizeCategoryType(category);
	const CategoryCapitalize = formatString(normalizedCategory);
 
	return (
		<main className="flex-grow pt-[72px]">
			<Quote />
			<h1 className="text-4xl mt-10 font-bold text-center">{CategoryCapitalize}</h1>
			<div className="container mx-auto">
				<ProjectByCategory category={normalizedCategory} />
			</div>
			<ContactForm />
		</main>
	);
}
