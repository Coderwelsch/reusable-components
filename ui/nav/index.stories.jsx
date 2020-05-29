import React from "react";
import Nav from "./";

import Hero from "react-bulma-components/lib/components/hero/hero";


export default {
  title: 'UI / Navigation',
  component: Nav,
};

export const Default = () =>
	<div>
		<Nav
			NavItems={ [
				{
					label: "Home",
					target: "home"
				}, {
					label: "Pricing",
					target: "pricing"
				}
			] }
		/>

		<Hero
			id={ "home" }
			size={ "fullheight" }>
			Home
		</Hero>

		<Hero
			id={ "pricing" }
			size={ "fullheight" }>
			Pricing
		</Hero>
	</div>;