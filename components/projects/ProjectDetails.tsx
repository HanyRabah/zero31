import { Project } from "@/types/dashboard";

const ProjectDetails = ({ project }: { project: Project }) => {
	const { title, clientName, location, year, scopes, type, area, description } = project;

	const renderScopes = () => {
		const scopesList = scopes
			.map(scope => {
				return scope.scope.name;
			})
			.join(", ");
		return scopesList;
	};
	return (
		<main className="flex-grow bg-novo-blue">
			<div className="container p-20 md:p-[50px]">
				<div className="flex flex-col justify-between md:flex-row md:gap-16">
					<div className="flex flex-col gap-8  mb-20 md:mb-0">
						<h1 className="text-lg font-bold text-black mb-[26px]">{title}</h1>
						{/* {clientName && (
							<p className="text-xs md:text-sm text-novo-grey">
								<strong className="font-mono">Client Name:</strong> {clientName}
							</p>
						)} */}
						{type && (
							<p className="text-xs md:text-sm text-novo-grey">
								<strong className="font-mono">Type:</strong> {type.name}
							</p>
						)}
						<p className="text-xs md:text-sm text-novo-grey">
							<strong className="font-mono">Scope:</strong> {renderScopes()}
						</p>

						{area && (
							<p className="text-xs md:text-sm text-novo-grey">
								<strong className="font-mono">Area:</strong> {area}
							</p>
						)}
						{location && (
							<p className="text-xs md:text-sm text-novo-grey">
								<strong className="font-mono">Location:</strong> {location}
							</p>
						)}
						{year && (
							<p className="text-xs md:text-sm text-novo-grey">
								<strong className="font-mono">Year:</strong> {year}
							</p>
						)}
					</div>
					<div className="width-full md:w-1/3 mt-[36px]">
						<p className="text-sm md:text-sm text-novo-grey">{description}</p>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ProjectDetails;
