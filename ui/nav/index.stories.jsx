import React from "react";
import Nav from "./";

import Section from "react-bulma-components/lib/components/section/section";


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
				}
			] }
		/>

		<Section id={ "home" }>
			Home
		</Section>
	</div>;