<script lang="ts">

	import { onMount } from "svelte";
	import { aboutAnchor, loadPagePromise, slickScrollInstance } from "$lib/store";
	import { letterSlideIn, maskSlideIn } from "$lib/animations";
	import { loadImage, onScrolledIntoView } from "$lib/utils";

	let section1Element: HTMLElement, section2Element: HTMLElement;
	let profilePicContainer: HTMLElement;

	// Promise which when resolved will trigger svelte animations
	let sectionOneResolve: (value?: any) => void;
	let sectionOnePromise = new Promise((resolve) => sectionOneResolve = resolve);
	let sectionTwoResolve: (value?: any) => void;
	let sectionTwoPromise = new Promise((resolve) => sectionTwoResolve = resolve);

	onMount(async () => {
		// Wait for page to load
		await loadPagePromise;
		// Set navbar about link's y location to top of aboutContainer
		$aboutAnchor = section1Element;

		$slickScrollInstance.addOffset({
			element: profilePicContainer,
			speedY: 0.8
		});

		onScrolledIntoView(section1Element, () => sectionOneResolve(true));
		onScrolledIntoView(section2Element, () => sectionTwoResolve(true));
	});

	function titleIn(node: HTMLElement) {
		const titleAnimation = letterSlideIn(node, { delay: 15 });
		titleAnimation.anime();
	}

	// Add parallax scrolling offsets to slickScroll
	function addSlickScrollOffset(node: HTMLElement) {
		$slickScrollInstance.addOffset({
			element: node,
			speedY: 0.8
		});
	}
	

</script>
<div class="hom" bind:this={section1Element}>
	<video playsinline autoplay muted loop class="video">
		<source src="https://ik.imagekit.io/btzumqjb35/heroSectionAsset.mp4?updatedAt=1710310255848" type="video/mp4">
	</video>
<div id="content-container" class="about">
	{#await sectionOnePromise then _}
		<div class="content-wrapper">
			<h1 class="title" style="text-transform: none;" use:titleIn>
				We're <br>Crave Medias
			</h1>
			<div in:maskSlideIn|global={{ duration: 1200, reverse: true, delay: 150 }}>
				<p class="paragraph">
					Welcome to Crave Medias, where innovation meets impact in the dynamic world of digital strategy. We're not just another agency; we're your strategic partners in navigating the ever-evolving landscape of online presence and brand growth.

<br><br>At Crave Medias, we're fueled by a passion for creativity and a relentless pursuit of excellence. Our team of digital aficionados is dedicated to crafting bespoke solutions that not only meet your needs but exceed your expectations. Whether it's PR that captures attention, websites that captivate audiences, apps that streamline processes, or social media campaigns that spark conversations, we're here to make your brand shine in the digital sphere.
<br><br>
What sets us apart? It's our unwavering commitment to your success. We don't just deliver services; we deliver results. With a keen understanding of industry trends and cutting-edge technology, we tailor our approach to fit your unique goals and aspirations.

				</p>
			</div>
			<div class="social-button-wrapper">
				<div in:maskSlideIn|global={{ delay: 400, reverse: true }}>
					<span class="button"><a href="mailto:info@cravemedias.com" target="_blank" style="text-transform: none;" class="clickable sublink link">Email Us</a></span>
				</div>
				<div in:maskSlideIn|global={{ delay: 700, reverse: true }}>
					<span class="button"><a href="tel:+919990200700" target="_blank" style="text-transform: none;" class="clickable sublink link">Call Us</a></span>
				</div>
			</div>
		</div>
		<div class="profile-image" use:addSlickScrollOffset>
			{#await loadImage("https://ik.imagekit.io/btzumqjb35/Profile-Photo(2).png?updatedAt=1710331631914") then src}
				<img src="{src}" in:maskSlideIn|global={{ duration: 1200,
					delay: 100,
					reverse: true,
					maskStyles: [
						{ property: "width", value: "100%"},
						{ property: "height", value: "100%"}
					]
				}} alt="Crave Medias" class="profile-pic">
			{/await}
		</div>
	{/await}
</div>

<div class="horizontal-flex" bind:this={section2Element}>
	{#await sectionTwoPromise then _}
		<ul class="list first">
			<li class="list-title">
				<div in:letterSlideIn|global={{ initDelay: 400 }}>
					Achivements
				</div>
			</li>
			<li>
				<div in:letterSlideIn|global={{ initDelay: 550 }}>
					Built a network of more than 60 million followers
				</div>
			</li>
			<li>
				<div in:letterSlideIn|global={{ initDelay: 650 }}>
					Google Knowledge Panel Optimization Success Stories
				</div>
			</li>
			<li>
				<div in:letterSlideIn|global={{ initDelay: 750 }}>
					Currently handling more than 300+ Successful pages
				</div>
			</li>
			<li>
				<div in:letterSlideIn|global={{ initDelay: 850 }}>
					100+ Successful PR Campaigns
				</div>
			</li>
		</ul>
	{/await}
</div>
</div>


<style lang="sass">

@import "../consts.sass"
@include textStyles()

#content-container.about
	display: flex
	flex-direction: row
	justify-content: space-between
	overflow: hidden
	padding: 0 5vw
	margin-top: 40vh
	position: relative
	padding-bottom: 5vh


	@media only screen and (max-width: 950px)
		flex-direction: column
		padding: 0 8vw
		margin-top: 30vh

	.profile-image
		width: 55%
		height: 100vh
		overflow: hidden
		margin-top: -40vh
		position: relative

		img
			height: 80%
			width: 90%
			border-radius: 0.5vh
			object-fit: cover

	.content-wrapper
		box-sizing: border-box
		width: 100%
		height: 100%
		margin: 0 2vw
		display: flex
		flex-direction: column
		justify-content: center
		margin-top: 5vh
		box-sizing: border-box
		z-index: 2

		@media only screen and (max-width: 950px)
			&
				width: 90%
				margin-right: 15vw
				order: 1


				h1
					font-size: 25vw !important

		h1
			font-size: 20vh
			font-weight: 400

		.paragraph
			margin-top: 10vh
			margin-left: 13vw
			position: relative
			width: 60%
			line-height: 1.5rem

			@media only screen and (max-width: 750px)
				&
					width: 100%
					margin-left: 1vw

			&::before
				content: ""
				position: absolute
				height: 1px
				width: 10vw
				right: 115%
				top: 15%
				background-color: white
				

		.social-button-wrapper
			font-size: 3vh
			margin-left: 13vw
			margin-top: 4vh
			display: inline-block

			& :global(*:not(:last-child))
				margin-right: 2vw

			@media only screen and (max-width: 750px)
				&
					margin-left: 5vw


	@media only screen and (max-width: 950px)
		.profile-image
			order:-1
			width: 85%
			margin-bottom: 60vh

.horizontal-flex
	display: flex
	flex-direction: row
	justify-content: space-between
	padding: 0 13vw
	margin-top: 12vh
	width: 100%
	box-sizing: border-box
	margin-bottom: 10vh

	@media only screen and (max-width: 1080px)
		flex-direction: column
		padding: 0 8vw

	.list
		list-style-type: none
		text-align: left

		@media only screen and (max-width: 1080px)
			margin-top: 10vh

		li.list-title
			letter-spacing: 0.6vh
			font-size: 1.3vh
			font-weight: bold

		li
			font-family: $font
			text-transform: uppercase
			font-size: 2vh
			letter-spacing: 0.5vh
			padding: 2vh 0
			border-bottom: 1px solid #444
			display: flex
			flex-wrap: wrap
			flex-direction: row
			justify-content: space-between
			align-items: center
			column-gap: 10vw
			row-gap: 3vh

			img
				height: 2.3vh
.hom
	position: relative
	overflow: hidden
.hom video
	position: absolute
	top: 0
	left: 0
	width: 100%
	height: 100%
	object-fit: cover
	z-index: -1
</style>