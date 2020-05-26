import React, { Component } from "react";
import PropTypes from "prop-types";

import Container from "react-bulma-components/lib/components/container/container";

import Styles from "./index.module.scss";


export default class Nav extends Component {
	static propTypes = {
		RootContainerProps: PropTypes.object,
		ContainerProps: PropTypes.object,

		LogoComp: PropTypes.func,
		LogoProps: PropTypes.object,


		NavItemComp: PropTypes.func,
		NavItems: PropTypes.arrayOf(PropTypes.shape({
			link: PropTypes.string,
			label: PropTypes.string.isRequired,
			target: PropTypes.string
		})).isRequired
	};
	
	static defaultProps = {};

	state = {
		active: ""
	};

	scrollContainerRef = React.createRef();
	activeNavItemRef = React.createRef();

	_scrollHandler = null;
	_resizeHandler = null;
	_targets = null;

	/*
	* COMPONENT METHODS
	*/

	componentDidMount () {
		if (!this.props.NavItems) {
			return null;
		}

		// set targets
		const selectors = this.props.NavItems.map(item => `#${ item.target }`).join(", ");
		const targets = document.body.querySelectorAll(selectors);

		// cancel if no target was found
		if (!targets || !targets.length) {
			console.warn("Couldn’t find any matching target section in document.body");
			return null;
		}

		// set targets
		this._targets = [ ...document.body.querySelectorAll(selectors) ];

		// scroll listener
		this._scrollHandler = this.onScroll.bind(this);
		window.addEventListener("scroll", this._scrollHandler);
		this.onScroll();

		// nav resize listener
		this._resizeHandler = this.onResize.bind(this);
		window.addEventListener("resize", this._resizeHandler);
		this.onResize();
	}

	componentDidUpdate (prevProps, prevState, snapshot) {
		if (this.activeNavItemRef.current) {
			this.activeNavItemRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		}
	}

	componentWillUnmount () {
		window.removeEventListener("scroll", this._scrollHandler);
		window.removeEventListener("resize", this._resizeHandler);
	}

	/*
	* EVENT LISTENERS
	*/

	onResize () {
		const e = this.scrollContainerRef.current;

		if (e && e.scrollWidth !== e.clientWidth) {
			this.setState({
				...this.state,
				isNavOverflowing: true
			});
		} else if (this.state.isNavOverflowing) { // only set new state if necessary
			this.setState({
				...this.state,
				isNavOverflowing: false
			});
		}
	}

	onScroll () {
		const filtered = this._targets.filter(elem => {
			const rect = elem.getBoundingClientRect();
			const scrollY = window.pageYOffset;

			return (
				rect.top <= scrollY &&
				rect.top + rect.height > scrollY
			);
		});

		if (filtered.length) {
			this.setState({
				...this.state,
				active: filtered[0].id
			});
		} else {
			this.setState({
				...this.state,
				active: this.props.navElements[this.props.navElements.length - 1].target
			});
		}
	}

	onClick (event) {
		document.querySelector("#" + event.target.dataset.target).scrollIntoView({
			behavior: "smooth"
		});
	}

	/*
	* RENDER METHODS
	*/

	renderItem (item) {
		const isActiveElem = item.target === this.state.active;

		return (
			<li key={ item.target || item.link }>
				<a
					onClick={ item.target && this.onClick.bind(this) }
					href={ item.link }
					rel="noopener noreferrer"
					ref={ isActiveElem ? this.activeNavItemRef : undefined }
					className={ [
						Styles.item,
						isActiveElem ? Styles.active : undefined
					].join(" ") }
					data-target={ item.target }>

					{ item.label }

				</a>
			</li>
		);
	}
	
	render () {
		const {
			LogoComp,
			LogoProps,
			ContainerProps,
			RootContainerProps
		} = this.props;

		return (
			<nav { ...RootContainerProps }>
				<Container { ...ContainerProps }>
					{ LogoComp ?
						<LogoComp { ...LogoProps } /> :
						<Logo_PL { ...LogoProps } />
					}

					<ul
						ref={ this.scrollContainerRef }
						className={ Styles.items }>
						{ this.props.NavItems.map(this.renderItem.bind(this)) }
					</ul>
				</Container>
			</nav>
		);
	}
}


const Logo_PL = (props) =>
	<a href={ "/" } { ...props }>LOGO</a>;