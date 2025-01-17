import { Project } from "@/config/projects/types";

const ProjectDetails = ({ projectData }: { projectData: Project }) => {
	const { title, clientName, location, year, scope, type, description } = projectData;

	return (
		<main className="flex-grow bg-novo-blue">
			<div className="container p-[50px]">
				<div className="flex flex-col justify-between gap-8 md:flex-row">
					<div className="flex flex-col gap-4">
						<h1 className="text-3xl font-bold text-novo-blue">{title}</h1>
						<p className="text-lg text-novo-grey">{clientName}</p>
						<p className="text-lg text-novo-grey">{location}</p>
						<p className="text-lg text-novo-grey">{year}</p>
						<p className="text-lg text-novo-grey">{scope}</p>
						<p className="text-lg text-novo-grey">{type}</p>
					</div>
					<div>
						<p className="text-lg text-novo-grey">{description}</p>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ProjectDetails;
