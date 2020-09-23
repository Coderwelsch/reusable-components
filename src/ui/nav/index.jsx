import React, { Component } from "react";
import PropTypes from "prop-types";

import Container from "react-bulma-components/lib/components/container/container";

import { cn, scrollToElement } from "../../helper";
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
			hrefTarget: PropTypes.string
		})).isRequired,
		NavItemProps: PropTypes.object,

		CTAButtonComp: PropTypes.func,

		scrollOffset: PropTypes.number,

		mobileBreakpoint: PropTypes.number,
		MobileNavComp: PropTypes.func
	};

	static defaultProps = {
		RootContainerProps: {},
		ContainerProps: {},
		NavItemsContainerProps: {},
		NavItemProps: {},

		scrollOffset: 0,
	};

	state = {
		active: "",
		isNavOverflowing: false,
		browserWidth: typeof window !== "undefined" ? window.innerWidth : undefined
	};

	scrollContainerRef = React.createRef();
	activeNavItemRef = React.createRef();

	_scrollHandler = null;
	_resizeHandler = null;
	_targets = null;

	/*
	* HELPER METHODS
	*/

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
		const browserWidth = window.innerWidth;

		if (e && e.scrollWidth !== e.clientWidth) {
			this.setState({
				...this.state,
				isNavOverflowing: true,
				browserWidth
			});
		} else if (this.state.isNavOverflowing) { // only set new state if necessary
			this.setState({
				...this.state,
				isNavOverflowing: false,
				browserWidth
			});
		} else {
			this.setState({
				...this.state,
				isNavOverflowing: false,
				browserWidth
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
		scrollToElement(
			`#${ event.currentTarget.dataset.target }`,
			this.props.scrollOffset
		);
	}

	/*
	* RENDER METHODS
	*/

	renderItem (item) {
		const isActiveElem = item.target === this.state.active;
		const onClick = item.target ? this.onClick.bind(this) : undefined;

		// fix eslint error jsx-a11y/control-has-associated-label
		const eventProps = {};

		if (onClick) {
			eventProps.onClick = onClick;
			eventProps.onKeyDown = onClick;
		}

		// custom nav item
		if (this.props.NavItemComp) {
			const { NavItemComp } = this.props;

			return (
				<NavItemComp
					{ ...this.props.NavItemProps }
					{ ...eventProps }
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
				{ ...eventProps }
				className={ [
					Styles.item,
					this.props.NavItemProps.className || undefined,
					isActiveElem ? Styles.active : undefined,
				].join(" ") }
				data-target={ item.target }
				key={ item.target || item.link }
				data-active={ isActiveElem || undefined }
				ref={ isActiveElem ? this.activeNavItemRef : undefined }>

				<a
					href={ item.link }
					target={ item.hrefTarget }
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
			mobileBreakpoint,
			MobileNavComp
		} = this.props;

		const { browserWidth } = this.state;

		return (
			<nav
				{ ...RootContainerProps }
				className={ [
					Styles.nav,
					RootContainerProps.className,
				].join(" ") }>

				<Container
					{ ...ContainerProps }
					className={ cn(
						Styles.container,
						ContainerProps.className
					) }>
					{ LogoComp ?
						<LogoComp { ...LogoProps } /> :
						<LogoPlaceholder { ...LogoProps } />
					}

					{ MobileNavComp && browserWidth < mobileBreakpoint ?
						<MobileNavComp />:
						this.renderNavItemsList()
					}
				</Container>
			</nav>
		);
	}

	renderNavItemsList () {
		const {
			CTAButtonComp,
			NavItemsContainerProps,
		} = this.props;

		return (
			<ul
				{ ...NavItemsContainerProps }
				ref={ this.scrollContainerRef }
				className={ cn(
					Styles.items,
					NavItemsContainerProps.className
				) }>

				{/* standard nav items */ }
				{ this.props.NavItems.map(this.renderItem.bind(this)) }

				{/* special cta button */ }
				{ CTAButtonComp && <CTAButtonComp/> }
			</ul>
		);
	}
}

const LogoPlaceholder = (props) =>
	<a href={ "/" } { ...props }>LOGO</a>;