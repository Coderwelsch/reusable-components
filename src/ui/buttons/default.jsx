import React from "react";
import PropTypes from "prop-types";

import Button from "react-bulma-components/lib/components/button/button";
import { cn } from "../../helper";
import Styles from "./default.module.scss";


const Default = ({ children, className, ...props }) =>
	<Button
		className={ cn(className, Styles.button) }
		{ ...props }>

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