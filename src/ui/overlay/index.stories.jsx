import React, { useState } from "react";

import Hero from "react-bulma-components/lib/components/hero/hero";
import Button from "react-bulma-components/lib/components/button/button";
import ButtonGroup from "react-bulma-components/lib/components/button/components/button-group";

import Overlay from "./index";
import Styles from "./index.stories.module.scss";


export default {
  title: 'UI / Overlay',
  component: Overlay,
};

export const Default = () => {
	const [isOverlayActive, setOverlayState] = useState(false);

	return (
		<div>
			<Hero
				id={ "home" }
				size={ "fullheight" }>

				<Hero.Body>
					<ButtonGroup position={ "centered" }>
						<Button
							color={ !isOverlayActive && "primary" }
							onClick={ () => setOverlayState(true) }>
							{ isOverlayActive ?
								"Overlay opened" :
								"Open Overlay"
							}
						</Button>
					</ButtonGroup>
				</Hero.Body>

			</Hero>

			<Overlay
				contentProps={ {
					className: Styles.overlayContent
				} }
				isActive={ isOverlayActive }
				onClose={ () => setOverlayState(false) }>
				Hallo!
			</Overlay>
		</div>
	)
};