<script lang="ts">

	import anime from "animejs";
	import { onMount } from "svelte";
	import { homeAnchor, loadPagePromise, slickScrollInstance } from "$lib/store";
	import { loadImage } from "$lib/utils";

	// DOM Node Binds for animations
	let homeContainerElement: HTMLElement; // Container
	let backgroundContainerElement: HTMLElement, backgroundImageElement: HTMLElement; // Offsets
	let titleWord1Element: HTMLElement, titleWord2Element: HTMLElement, shortDetailsElement: HTMLElement, callToActionElement: HTMLElement, logo:HTMLElement; // Elements for animations
	let signaturePath1: SVGPathElement, signaturePath2: SVGPathElement, signaturePath3: SVGPathElement, signaturePath4: SVGPathElement; // SVG Paths

	onMount(async () => {
		await loadPagePromise;
		// Set navbar home link's y location to top of homeContainer
		$homeAnchor = homeContainerElement;

		// Add parallax scrolling offsets to slickScroll
		$slickScrollInstance!.addOffset({
			element: backgroundContainerElement,
			speedY: 0.8
		});

		introAnimations();
	})


	// Page load animations
	function introAnimations() {

		const animation = [{ strokeDashoffset: '0' }];


		// Animate background image
		Object.assign(backgroundContainerElement.style, {
			height: "0",
			transform: "scale(1.3)",
		});
		backgroundImageElement.style.transform = "translateY(80%) scale(1.4)";

		anime({
			targets: backgroundContainerElement,
			height: "100%",
			scale: 1,
			easing: "cubicBezier(0.165, 0.84, 0.44, 1)",
			duration: 1500,
			delay: 500,
			complete: () => {
				backgroundContainerElement.style.boxShadow = "3px 9px 18px rgba(0, 0, 0, 0.2)";
			}
		});
		anime({
			targets: backgroundImageElement,
			translateY: "0",
			scale: 1,
			easing: "cubicBezier(0.165, 0.84, 0.44, 1)",
			duration: 1500,
			delay: 500
		});


		// Animate title elements
		const titleElements = [titleWord1Element, titleWord2Element, shortDetailsElement, callToActionElement, logo];
		titleElements.forEach(e => {
			e.style.transform = "translateY(130%) rotate(10deg)";
		})
		anime({
			targets: titleElements,
			rotate: "0",
			translateY: "0%",
			easing: "cubicBezier(0.165, 0.84, 0.44, 1)",
			duration: 900,
			delay: anime.stagger(80, {start: 500})
		});
	}

</script>



<div id="content-container" style="padding-top: 23vh" bind:this={homeContainerElement}>
	<div class="content-wrapper">
		<div class="flex">
			<div class="flex-wrapper first">

				<img bind:this={logo} id="signature" class="h-signature" src="assets/imgs/logo-notext.svg" alt="logo">
					
			</div>
			
			<div class="flex-wrapper second">
				<h1 class = "title" style="text-transform: none;">
					<div class="title-mask">
						<div class="word" bind:this={titleWord1Element}>CR<img class="img-arrow" src="assets/imgs/arrow.svg" alt="" srcset="">VE</div>
					</div><br> 
					<div class="title-mask">
						<div class="word" bind:this={titleWord2Element}>MEDIAS</div>
					</div>
				</h1>
				<div class="occupation mask">
					<p class = "paragraph" bind:this={shortDetailsElement}>
						Providing all the services that you crave for 
					</p>
				</div>
				<div class="wrapper action-mask">
					<div class="action" bind:this={callToActionElement}>
						<div class="mask">
							{#await loadImage("assets/imgs/scroll_arrow.png") then src}
								<img src="{src}" alt="">
							{/await}
						</div>
						<div>
							scroll
						</div>
					</div>
				</div>
			</div>

			<div class="parallax-wrapper home-back" bind:this={backgroundContainerElement}>
				{#await loadImage("https://images.unsplash.com/photo-1553884014-36a8cb70674f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") then src}
					<img src="{src}" bind:this={backgroundImageElement} draggable="false" alt="Home Background" style="width:100%  ;height: 100%; object-fit: cover;">
				{/await}
			</div>
		</div>
	</div>
</div>



<style lang="sass">
	img
@import "../consts"
@include textStyles()

#content-container
	height: 100vh
	width: 100vw
	padding: 12vh 7vw
	box-sizing: border-box
	position: relative

	.content-wrapper
		position: relative
		height: 100%
		box-sizing: border-box
		z-index: 2

	.flex
		z-index: 2
		width: 95%
		height: 100%
		display: flex
		flex-direction: row
		justify-content: space-between
		position: relative
		box-sizing: border-box

		.flex-wrapper
			position: relative
			height: 100%
			display: flex
			flex-direction: column
			justify-content: center

			.img-arrow
				width:12rem
				margin-bottom: -2.5rem
				margin-left: -2rem
				margin-right: -4rem

				@media only screen and (max-width: 750px)
					&
						width: 22vw
						margin-top: 10vw
						margin-bottom: -4vw
						margin-left: -1rem
						margin-right: -2rem
				
			&.second
				margin-right: 5vw 
				justify-content: flex-end

			h1
				font-weight: 300
				text-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3)
			
			p
				white-space: nowrap
				font-size: 1.5rem
				
				@media only screen and (max-width: 750px)
					&
						white-space: normal
						font-size: 1.3rem

			.title-mask
				overflow: hidden
				display: inline-flex

			.mask
				overflow: hidden

			.h-signature
				width: 35vh
				margin-left: -6vh

			.occupation
				position: relative
				margin-top: 8vh

			.action-mask
				margin-top: 10vh
				margin-right: 7vw
				display: inline-flex
				overflow: hidden

				.action
					font-size: 2vh
					letter-spacing: 0.5vh
					font-family: $font
					text-transform: uppercase
					color: white
					position: relative
					display: inline-flex
					flex-direction: row
					align-items: center

					.mask
						overflow: hidden
						height: 2vh

						img
							height: 2.3vh
							margin-right: 1.5vh
							animation: scrollArrowLoop 3s ease infinite

	.parallax-wrapper
		position: absolute
		left: 0
		z-index: -1
		width: 80%
		height: 100%
		margin-left: 5%
		border-radius: 1.5vh
		overflow: hidden
		box-sizing: border-box
		-webkit-touch-callout: none
		-webkit-user-select: none
		-moz-user-select: none
		-ms-user-select: none
		user-select: none
		transition: box-shadow 0.6s ease
		-webkit-transition: box-shadow 0.6s ease

		@media only screen and (max-width: 1250px)
			&
				opacity: 0.7

		@media only screen and (max-width: 750px)
			&
				opacity: 0.3

		img
			height: 100%
			width: 100%
			object-fit: cover
			border-radius: 1.5vh

@media only screen and (min-width: 1250px)
	.h-signature
		display: block

	.occupation
		width: 100%

	#content-container .flex *
		text-align: left

@media only screen and (max-width: 1250px)
	#content-container .flex *
		text-align: left

	.flex
		justify-content: center !important
		width: 100% !important

		.flex-wrapper 
			&.first
				display: none !important

			&.second
				justify-content: center !important
				margin: 0

	#content-container .flex .bottom
		text-align: left
		left: 5vw

	.parallax-wrapper
		width: 100% !important
		margin-left: 0 !important

@media only screen and (max-width: 750px)
	.occupation
		width: 70%


#signature
	.path-1
		stroke-dasharray: 365
		stroke-dashoffset: 365
	
	.path-2
		stroke-dasharray: 85
		stroke-dashoffset: 85

	.path-3
		stroke-dasharray: 45
		stroke-dashoffset: 45

	.path-4
		stroke-dasharray: 180
		stroke-dashoffset: 180


@keyframes scrollArrowLoop
	0%
		transform: translateY(-120%)
	
	30%
		transform: translateY(0%)
	
	70%
		transform: translateY(0%)
	
	100%
		transform: translateY(120%)

</style>