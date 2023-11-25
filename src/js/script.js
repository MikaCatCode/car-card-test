document.addEventListener('DOMContentLoaded', () => {
	"use strict"

	const movingElement = () => {
		/**
		 * when, where, after what (optional)
		 * data-moveto="max-width: 800px, .test3, .test2"
		 */
		const elems = document.querySelectorAll("[data-moveto]");

		if (elems.length > 0) {
			let оbjects = [];
			for (let i = 0; i < elems.length; i++) {
				const dataArray = elems[i].dataset.moveto.split(",");
				const оbject = {};
				оbject.elem = elems[i];
				оbject.parent = elems[i].parentNode;
				оbject.parentDist = elems[i].parentNode.parentNode;
				if (elems[i].previousElementSibling) {
					оbject.sibling = elems[i].previousElementSibling.className;
				}
				оbject.breakpoint = dataArray[0].trim();
				оbject.to = dataArray[1].trim();
				if (dataArray[2]) {
					оbject.after = dataArray[2].trim();
				}
				оbjects.push(оbject);
			}



			for (let i = 0; i < оbjects.length; i++) {
				let wmm = window.matchMedia(`(${оbjects[i].breakpoint})`);
				let sibling = оbjects[i].sibling.split(" ")
				wmm.addListener(() => {
					if (wmm.matches) {
						if (оbjects[i].after) {

							if (оbjects[i].parentDist && оbjects[i].parentDist.querySelector(оbjects[i].after)) {
								оbjects[i].parentDist.querySelector(оbjects[i].after).insertAdjacentElement('afterend', оbjects[i].elem);
							} else if (оbjects[i].parentDist) {
								оbjects[i].parentDist.querySelector(оbjects[i].to).insertAdjacentElement('afterbegin', оbjects[i].elem);
							} else {
								document.querySelector(оbjects[i].after).insertAdjacentElement('afterend', оbjects[i].elem);
							}

						} else {
							document.querySelector(оbjects[i].to).insertAdjacentElement('beforeend', оbjects[i].elem);
						}
					} else {
						if (sibling[0] && sibling[0] != 'undefined') {
							if (оbjects[i].parentDist) {
								оbjects[i].parentDist.querySelector('.' + sibling[0]).insertAdjacentElement('afterend', оbjects[i].elem);
							} else {
								document.querySelector('.' + sibling[0]).insertAdjacentElement('afterend', оbjects[i].elem);
							}
						} else {
							оbjects[i].parent.insertAdjacentElement('beforeend', оbjects[i].elem);
						}

					}
				});

				if (wmm.matches) {
					if (оbjects[i].after) {
						if (оbjects[i].parentDist && оbjects[i].parentDist.querySelector(оbjects[i].after)) {
							оbjects[i].parentDist.querySelector(оbjects[i].after).insertAdjacentElement('afterend', оbjects[i].elem);
						} else if (оbjects[i].parentDist) {
							оbjects[i].parentDist.querySelector(оbjects[i].to).insertAdjacentElement('afterbegin', оbjects[i].elem);
						} else {
							document.querySelector(оbjects[i].after).insertAdjacentElement('afterend', оbjects[i].elem);
						}

					} else {
						document.querySelector(оbjects[i].to).insertAdjacentElement('afterend', оbjects[i].elem);
					}
				}
			}
		}

	}
	movingElement();

});

import Swiper, { Pagination } from 'swiper';
Swiper.use([Pagination]);

const cardSliders = document.querySelectorAll('.cardslider');
if (cardSliders.length > 0) {
	cardSliders.forEach(slider => {
		const cardSl = new Swiper(slider, {
			modules: [Pagination],
			mousewheel: true,
			pagination: {
				el: slider.parentElement.querySelector(".swiper-pagination"),
				clickable: true,
			}
		});
	});
}