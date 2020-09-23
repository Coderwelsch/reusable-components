import React from "react";
import PropTypes from "prop-types";

import { Default } from "./index";
import Styles from "./arrow.module.scss";


const ArrowButton = ({
	className,
	arrowLeft,
	arrowRight,
	...props
}) =>
	<Default
		className={ [
			className,
			Styles.arrow,
			arrowLeft ?
				Styles.arrowLeft :
				Styles.arrowRight
		].join(" ") }
		{ ...props }
	/>;

ArrowButton.propTypes = {
	className: PropTypes.string,
	arrowLeft: PropTypes.bool,
	arrowRight: PropTypes.bool,
};


const ArrowLeft = props =>
	<ArrowButton
		{ ...props }
		arrowLeft
	/>;


const ArrowRight = props =>
	<ArrowButton
		{ ...props }
		arrowRight
	/>;


export {
	ArrowLeft,
	ArrowRight
}

export default ArrowButton;