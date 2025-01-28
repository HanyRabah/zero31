import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms and Conditions | ZERO31",
	description: "Terms and conditions for using ZERO31's website and services",
};

export default function TermsPage() {
	return (
		<main className="container mx-auto px-24 py-80">
			<div className="max-w-[800px] mx-auto">
				<h1 className="text-[48px] font-title mb-48">Terms and Conditions</h1>

				<div className="space-y-32 text-[16px] leading-[24px]">
					{/* Introduction */}
					<section>
						<p>
							Thank you for using our website!
							<br />
							<br />
							These terms and conditions outline the rules and regulations for the use of ZERO31's Website, located at
							www.zero-31.com. By accessing this website we assume you accept these terms and conditions. Do not
							continue to use ZERO31's website if you do not agree to take all of the terms and conditions stated on
							this page.
						</p>
					</section>

					{/* Terminology */}
					<section>
						<h2 className="text-[24px] font-title mb-16">Terminology</h2>
						<p>
							The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice
							and all Agreements:
						</p>
						<ul className="list-disc pl-24 mt-16 space-y-8">
							<li>
								"Client", "You" and "Your" refers to you, the person accessing this website and compliant to the
								Company's terms and conditions.
							</li>
							<li>"The Company", "Ourselves", "We", "Our" and "Us", refers to our Company.</li>
							<li>"Party", "Parties", or "Us", refers to both the Client and ourselves.</li>
						</ul>
					</section>

					{/* Cookies */}
					<section>
						<h2 className="text-[24px] font-title mb-16">Cookies</h2>
						<p>
							We employ the use of cookies. By accessing ZERO31 DESIGN STUDIO Ltd., you agreed to use cookies in
							agreement with the ZERO31 DESIGN STUDIO Ltd.'s Privacy Policy. Most interactive websites use cookies to
							let us retrieve the user's details for each visit. Cookies are used by our website to enable the
							functionality of certain areas to make it easier for people visiting our website.
						</p>
					</section>

					{/* License */}
					<section>
						<h2 className="text-[24px] font-title mb-16">License</h2>
						<p>
							Unless otherwise stated, ZERO31 DESIGN STUDIO Ltd. and/or its licensors own the intellectual property
							rights for all material on ZERO31 DESIGN STUDIO Ltd. All intellectual property rights are reserved.
						</p>
						<p className="mt-16">You must not:</p>
						<ul className="list-disc pl-24 mt-16 space-y-8">
							<li>Republish material from ZERO31</li>
							<li>Sell, rent or sub-license material from ZERO31</li>
							<li>Reproduce, duplicate or copy material from ZERO31</li>
							<li>Redistribute content from ZERO31</li>
						</ul>
					</section>

					{/* Comments */}
					<section>
						<h2 className="text-[24px] font-title mb-16">Comments Policy</h2>
						<p>
							Parts of this website offer an opportunity for users to post and exchange opinions and information. ZERO31
							does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not
							reflect the views and opinions of ZERO31, its agents and/or affiliates.
						</p>
					</section>

					{/* Hyperlinking */}
					<section>
						<h2 className="text-[24px] font-title mb-16">Hyperlinking to our Content</h2>
						<p>The following organizations may link to our Website without prior written approval:</p>
						<ul className="list-disc pl-24 mt-16 space-y-8">
							<li>Government agencies</li>
							<li>Search engines</li>
							<li>News organizations</li>
							<li>Online directory distributors</li>
						</ul>
					</section>

					{/* Disclaimer */}
					<section>
						<h2 className="text-[24px] font-title mb-16">Disclaimer</h2>
						<p>
							To the maximum extent permitted by applicable law, we exclude all representations, warranties and
							conditions relating to our website and the use of this website. We will not be liable for any loss or
							damage of any nature.
						</p>
					</section>
				</div>
			</div>
		</main>
	);
}
