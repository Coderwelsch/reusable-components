import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";


const Seo = ({
	title,
	description,
	absoluteUrl,
	absoluteTeaserImagePath,
	location,
	language,
	author,
}) =>
	<Helmet>
		{ /* Basic */ }
		<title>{ title }</title>
		<meta name="description" content={ description } />
		{ author &&
			<meta name="author" content={ author } />
		}

		{/* Document Settings */}
		<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />

		{ /* Open Graph */ }
		<meta property="og:title" content={ title } />
		<meta property="og:description" content={ description } />
		<meta property="og:url" content={ absoluteUrl } />
		<meta property="og:type" content="website" />
		<meta property="og:image" content={ absoluteTeaserImagePath } />

		{ /* Bing Location */ }
		<meta name="geo.position" content={ `${ location.latitude }; ${ location.longitude }`} />,
		<meta name="geo.placename" content={ location.locationName } />,
		<meta name="geo.region" content={ language } />
	</Helmet>;

Seo.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	absoluteUrl: PropTypes.string.isRequired,
	absoluteTeaserImagePath: PropTypes.string.isRequired,
	location: PropTypes.exact({
		latitude: PropTypes.number.isRequired,
		longitude: PropTypes.number.isRequired,
		locationName: PropTypes.string.isRequired
	}).isRequired,
	language: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
};

export default Seo;