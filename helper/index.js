// classnames concatenation
export const cn = (...classNames) => {
	return classNames
		.filter(c => typeof c === "string")
		.join(" ");
};