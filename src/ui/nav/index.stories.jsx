import React from "react";
import Hero from "react-bulma-components/lib/components/hero/hero";

//import
import Nav from "./index";


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
			size={ "fullheight" }
			backgroundColor={ "info" }>
			Home
		</Hero>

		<Hero
			id={ "pricing" }
			size={ "fullheight" }
			backgroundColor={ "success" }>
			Pricing
		</Hero>
	</div>;