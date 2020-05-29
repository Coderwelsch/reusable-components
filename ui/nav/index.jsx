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

		NavItemsContainerProps: PropTypes.object,

		NavItemComp: PropTypes.func,
		NavItems: PropTypes.arrayOf(PropTypes.shape({
			link: PropTypes.string,
			label: PropTypes.string.isRequired,
			target: PropTypes.string,
		})).isRequired,
		NavItemProps: PropTypes.object,

		CTAButtonComp: PropTypes.func,

		scrollOffset: PropTypes.number
	};

	static defaultProps = {
		RootContainerProps: {},
		NavItemsContainerProps: {},
		NavItemProps: {},

		scrollOffset: 0
	};

	state = {
		active: "",
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
		this._targets = [...document.body.querySelectorAll(selectors)];

		// scroll listener
		this._scrollHandler = this.onScroll.bind(this);
		window.addEventListener("scroll", this._scrollHandler);
		this.onScroll();

		// nav resize listener
		this._resizeHandler = this.onResize.bind(this);
		window.addEventListener("resize", this._resizeHandler);
		this.onResize();
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
				isNavOverflowing: true,
			});
		} else if (this.state.isNavOverflowing) { // only set new state if necessary
			this.setState({
				...this.state,
				isNavOverflowing: false,
			});
		}
	}

	onScroll () {
		const filtered = this._targets.filter(elem => {
			const rect = elem.getBoundingClientRect();
			const scrollY = window.pageYOffset;

			return (
				rect.top <= scrollY &&
				rect.top + rect.height >= scrollY
			);
		});

		if (filtered.length) {
			this.setState({
				...this.state,
				active: filtered[0].id,
			});
		} else {
			this.setState({
				...this.state,
				active: this.props.NavItems[this.props.NavItems.length - 1].target,
			});
		}
	}

	onClick (event) {
		const selector = `#${ event.currentTarget.dataset.target }`;
		const target = document.querySelector(selector);

		if (!target) {
			console.error(`Couldn’t find target element with selector «${ selector }» to scroll to`);
			return;
		}

		const targetY = target.getBoundingClientRect().top;
		const scrollPos = document.documentElement.scrollTop;
		const { scrollOffset } = this.props;

		const newScrollPos = targetY + scrollOffset + scrollPos;

		window.scrollTo({
			top: newScrollPos,
			behavior: "smooth"
		});
	}

	/*
	* RENDER METHODS
	*/

	renderItem (item) {
		const isActiveElem = item.target === this.state.active;
		const onClick = (!isActiveElem && item.target) ? this.onClick.bind(this): undefined;

		// custom nav item
		if (this.props.NavItemComp) {
			const { NavItemComp } = this.props;

			return (
				<NavItemComp
					onClick={ onClick }
					key={ item.target || item.link }
					active={ isActiveElem }
					ref={ isActiveElem ? this.activeNavItemRef : undefined }
					{ ...item }
				/>
			);
		}

		return (
			<li
				{ ...this.props.NavItemProps }
				className={ [
					Styles.item,
					this.props.NavItemProps.className || undefined,
					isActiveElem ? Styles.active : undefined,
				].join(" ") }
				data-target={ item.target }
				key={ item.target || item.link }
				onClick={ onClick }
				data-active={ isActiveElem || undefined }
				ref={ isActiveElem ? this.activeNavItemRef : undefined }>

				<a
					href={ item.link }
					rel="noopener noreferrer">

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
			RootContainerProps,
			CTAButtonComp,
			NavItemsContainerProps,
		} = this.props;

		return (
			<nav
				{ ...RootContainerProps }
				className={ [
					Styles.nav,
					RootContainerProps.className
				].join(" ") }>

				<Container { ...ContainerProps }>
					{ LogoComp ?
						<LogoComp { ...LogoProps } /> :
						<LogoPlaceholder { ...LogoProps } />
					}

					<ul
						{ ...NavItemsContainerProps }
						ref={ this.scrollContainerRef }
						className={ [
							Styles.items,
							NavItemsContainerProps.className || undefined,
						].join(" ") }>

						{/* standard nav items */}
						{ this.props.NavItems.map(this.renderItem.bind(this)) }

						{/* special cta button */}
						<CTAButtonComp />
					</ul>
				</Container>
			</nav>
		);
	}
}

const LogoPlaceholder = (props) =>
	<a href={ "/" } { ...props }>LOGO</a>;