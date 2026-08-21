/* L'Enfant Roi replica - demo build
   Two behaviours: scroll-linked media reveal, and in-view entrance animations.
   No library, no jQuery. */

(function () {
	'use strict';

	var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* --- 1. scroll-linked hero media -------------------------------------- */
	var media = document.querySelector('.section-hero-page-home .section__media');

	function updateMedia() {
		if (!media) return;
		var rect = media.getBoundingClientRect();
		/* Progress runs 0 -> 1 as the block travels up the viewport.
		   The two ratios are measured off the original: the circle is still
		   closed when the block sits at 0.66vh, and fully open once its top
		   has passed 0.25vh above the fold. */
		var start = window.innerHeight * 0.66;
		var end = window.innerHeight * -0.25;
		var p = (start - rect.top) / (start - end);
		p = Math.max(0, Math.min(1, p));
		media.style.setProperty('--media-progress', p.toFixed(4));
	}

	/* --- 2. in-view entrance ---------------------------------------------- */
	function initInView() {
		var targets = document.querySelectorAll('[data-animation], .section__arabesque');
		if (reduced || !('IntersectionObserver' in window)) {
			Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-inview'); });
			document.body.classList.add('is-inview');
			return;
		}
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				var el = entry.target;
				var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
				setTimeout(function () { el.classList.add('is-inview'); }, delay);
				io.unobserve(el);
			});
		}, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

		Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
	}

	/* --- 3. header tucks away on the way down ----------------------------- */
	var header = document.querySelector('.page__header');
	var lastY = window.pageYOffset;

	function updateHeader() {
		if (!header) return;
		var y = window.pageYOffset;
		var down = y > lastY;
		if (down && y > 160) header.classList.add('is-hidden');
		else if (!down) header.classList.remove('is-hidden');
		lastY = y;
	}

	/* --- 4. rAF-throttled scroll ------------------------------------------ */
	var ticking = false;
	function onScroll() {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(function () { updateMedia(); updateHeader(); ticking = false; });
	}

	document.documentElement.classList.remove('no-js');
	initInView();
	updateMedia();
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });
})();
