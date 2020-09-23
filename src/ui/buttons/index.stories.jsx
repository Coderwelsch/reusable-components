import React from "react";
import {
	Default as DefaultBtn,
	ArrowLeft as ArrowLeftBtn,
	ArrowRight as ArrowRightBtn
} from "./index";


export default {
  title: 'UI / Buttons',
  component: DefaultBtn,
};

export const Default = () =>
	<DefaultBtn>
		Default Button
	</DefaultBtn>;


export const ArrowLeft = () =>
	<ArrowLeftBtn>
		Arrow Left
	</ArrowLeftBtn>;

export const ArrowRight = () =>
	<ArrowRightBtn>
		Arrow Right
	</ArrowRightBtn>;