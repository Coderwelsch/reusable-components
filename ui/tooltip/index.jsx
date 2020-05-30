import React, { Component } from "react";
import { cn } from "../../helper";
import DefaultBtn from "../buttons";
import PropTypes from "prop-types";

import Styles from "./index.module.scss";


export default class Tooltip extends Component {
	static propTypes = {
		className: PropTypes.string
	};
	
	static defaultProps = {};
	
	render () {
		return (
			<DefaultBtn
				{ ...this.props }
				className={ cn(Styles.tooltip, this.props.className) }>
				{ this.props.children }
			</DefaultBtn>
		);
	}
}
