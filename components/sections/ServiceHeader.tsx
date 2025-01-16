import { ArrowDown } from "lucide-react";

const ServiceHeader = ({ serviceName, description }: { serviceName: string; description: string }) => {
	return (
		<section className="mx-auto">
			<div className="max-w-[800px] mx-auto text-center py-[48px]">{description}</div>
			<div className="flex content-center place-content-center border-y-[1px] border-black py-[30px] align-middle items-center">
				Our work in {serviceName}
				<ArrowDown className="h-[18px] font-thin  ml-2" />
			</div>
		</section>
	);
};
export default ServiceHeader;
