import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import { cn } from "../../helper";
import Styles from "./index.module.scss";


export default class Overlay extends Component {
	static propTypes = {
		createPortal: PropTypes.bool,
		containerProps: PropTypes.object,
		contentProps: PropTypes.object,

		isActive: PropTypes.bool,
		onClose: PropTypes.func.isRequired
	};
	
	static defaultProps = {
		createPortal: false,
		isActive: false,
		containerProps: {},
		contentProps: {}
	};

	state = {
		isClient: false
	};

	keyPressHandler = null;

	componentDidMount () {
		this.setState({
			...this.state,
			isClient: true
		});
	}

	componentDidUpdate (prevProps, prevState, snapshot) {
		if (this.props.isActive) {
			this.addEventListeners();
		} else {
			this.removeEventListeners();
		}
	}

	addEventListeners () {
		this.keyPressHandler = this.handleKeyPress.bind(this);
		window.addEventListener("keydown", this.keyPressHandler);
	}

	removeEventListeners () {
		window.removeEventListener("keydown", this.keyPressHandler);
		this.keyPressHandler = null;
	}

	handleClick (event) {
		if (event.target && event.target.classList.contains(Styles.overlay)) {
			this.props.onClose();
		}
	}

	handleKeyPress ({ key, ...event }) {
		if (key === "Escape") {
			event.preventDefault();
			this.props.onClose();

			return false;
		}
	}

	renderOverlay () {
		const {
			isActive,
			children,
			containerProps,
			contentProps,
		} = this.props;

		return (
			<div
				className={ cn(
					containerProps.className,
					Styles.overlay,
					isActive && Styles.isActive
				) }
				onClick={ this.handleClick.bind(this) }>

				<div
					{ ...contentProps }
					className={ cn(
						Styles.content,
						contentProps.className,
					) }>

					{ children }

				</div>

			</div>
		);
	}

	render () {
		if (this.props.createPortal) {
			if (!this.state.isClient) {
				return null;
			}

			return ReactDOM.createPortal(
				this.renderOverlay(),
				document.body
			)
		} else {
			return this.renderOverlay();
		}
	}
}
