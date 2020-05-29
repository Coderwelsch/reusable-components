import React from "react";
import PropTypes from "prop-types";

import Button from "react-bulma-components/lib/components/button/button";


const Default = ({ children, ...props }) =>
	<Button { ...props }>
		{ children }
	</Button>;

Default.propTypes = {
	...Button.propTypes,
	className: PropTypes.string,
};

Default.defaultProps = {
	...Button.defaultProps,
};

export default Default;