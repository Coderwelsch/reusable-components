import React from "react";

import Hero from "react-bulma-components/lib/components/hero/hero";

import Page from "./index";


export default {
  title: 'Layout / Page',
  component: Page,
};

export const Default = () => 
	<Page
		title={ "Home • Awesome Website Components by Coderwelsch" }
		description={ "Example page component with seo tags" }
		language={ "EN" }
		author={ "Coderwelsch – Coding & Design" }
		location={ {
			latitude: 52,
			longitude: 42,
			locationName: "Duff Brewery"
		} }
		absoluteTeaserImagePath={ "http://via.placeholder.com/300" }
		absoluteUrl={ "https://example.org" }>

		<Hero size={ "fullheight" }>
			<p>Hello, World!</p>
		</Hero>

	</Page>;