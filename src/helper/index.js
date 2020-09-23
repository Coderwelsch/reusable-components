// classnames concatenation
export const cn = (...classNames) => {
	return classNames
		.filter(c => typeof c === "string")
		.join(" ");
};

// scrolls to an element by a given selector
export const scrollToElement = (selector = "#someSelector", scrollOffset = 0) => {
	const target = document.querySelector(selector);

	if (!target) {
		console.error(`Couldn’t find target element with selector ${ selector } to scroll to`);
		return;
	}

	const targetY = target.getBoundingClientRect().top;
	const scrollPos = document.documentElement.scrollTop;

	const newScrollPos = targetY + scrollOffset + scrollPos;

	window.scrollTo({
		top: newScrollPos,
		behavior: "smooth",
	});
}

export const flattenObjectArray = (objectArray, key) => {
	const array = [];

	for (const object of objectArray) {
		if (object.hasOwnProperty(key)) {
			array.push(object[key]);
		}
	}

	return array;
};