import React from "react";
import Hero from "react-bulma-components/lib/components/hero/hero";
import Button from "react-bulma-components/lib/components/button/button";
import { ArrowRight } from "../buttons";

//import
import Nav from "./index";
import Styles from "./index.stories.module.scss";


export default {
  title: 'UI / Navigation',
  component: Nav,
};

export const CTAButton = () =>
	<ArrowRight
		color={ "dark" }
		className={ Styles.ctaButton }>
		Join us!
	</ArrowRight>;

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
				}, {
					label: "External Link",
					link: "https:/github.com"
				}
			] }

			CTAButtonComp={
				CTAButton
			}
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