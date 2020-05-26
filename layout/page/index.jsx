import React from "react";

import Seo from "../seo";


const Page = ({
  children,
  ...props
}) =>
	<React.Fragment>
		<Seo { ...props } />
		{ children }
	</React.Fragment>;


Page.propTypes = {
	...Seo.propTypes
};

export default Page;