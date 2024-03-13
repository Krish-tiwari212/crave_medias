<script lang="ts">

    import { onMount } from "svelte";
    import { letterSlideIn, maskSlideIn } from "$lib/animations";
    import { loadPagePromise, siteDataFetch, contactAnchor } from "$lib/store";
    import { onScrolledIntoView } from "$lib/utils";
    import type { SiteData } from "$lib/types";

    let footerContainerElement: HTMLElement, logoElement: HTMLElement, creditsElement: HTMLElement, statusElement: HTMLElement, fullEmailLinkElement: HTMLElement;
    let signaturePath1: SVGPathElement, signaturePath2: SVGPathElement, signaturePath3: SVGPathElement, signaturePath4: SVGPathElement; 

    let siteData: SiteData = { availablity_date: "" };

    siteDataFetch.subscribe(val => {
        if (val !== undefined)
            siteData = val;
    });

    const currentYear = new Date().getFullYear();
    
    function introAnimations() {

        // Scroll activated animations powered by anime instead of svelte transitions
        const logoAnimate = maskSlideIn(logoElement, {});
        const fullEmailLinkAnimate = letterSlideIn(fullEmailLinkElement, { delay: 6, initDelay: 150 });
        const creditsAnimate = maskSlideIn(creditsElement, { delay: 150 });
        const statusAnimate = letterSlideIn(statusElement, { delay: 6, initDelay: 100 });

        // Intersection observer to run animations when footer is in scroll view
        onScrolledIntoView(footerContainerElement, () => {
            logoAnimate.anime();
            creditsAnimate.anime();
            fullEmailLinkAnimate.anime();
            statusAnimate.anime();

            // Signature SVG animation
            let animation = [{ strokeDashoffset: '0' }];

            // Signature animation using svg strokDashOffset
            signaturePath1.animate(animation, {
                duration: 1000,
                delay: 0,
                easing: 'cubic-bezier(.72,.3,.25,1)',
                fill: 'forwards' 
            });
            signaturePath2.animate(animation, {
                duration: 300,
                delay: 1000,
                easing: 'cubic-bezier(.47,.41,.26,1)',
                fill: 'forwards' 
            });
            signaturePath3.animate(animation, {
                duration: 200,
                delay: 1300,
                easing: 'cubic-bezier(.47,.41,.26,1)',
                fill: 'forwards' 
            });
            signaturePath4.animate(animation, {
                duration: 1000,
                delay: 1500,
                easing: 'cubic-bezier(.47,.41,.26,1)',
                fill: 'forwards' 
            });
        });
    }

    onMount(async () => {
        await loadPagePromise;
        $contactAnchor = footerContainerElement;
        introAnimations();
    });
</script>



<div class="footer-wrapper" bind:this={footerContainerElement}>
    <!-- Left side -->
    <div class="flex-wrapper">
        <div class="logo-wrapper">
            <div class="inline-flex" bind:this={logoElement}>
                <img src="assets/imgs/logo.svg" alt="mh logo" class="logo">
            </div>
        </div>

        <div class="status-wrapper">
                <p class="large-text" bind:this={statusElement}>
                    Send us a email to get started
                </p>
                
            <a class="button large-text" bind:this={fullEmailLinkElement} href="mailto:info@cravemedias.com" target="_blank">info@cravemedias.com</a>
        </div>
        
        <div class="status-wrapper" style="margin-top: 2rem;">
            <p class="large-text" bind:this={statusElement}>
                Message us on Telegram
            </p>
            
            <a class="button large-text" bind:this={fullEmailLinkElement} href="https://t.me/opposites" target="_blank">t.me/opposites</a>
        </div>

        <div class="status-wrapper" style="margin-top: 2rem;">
            <p class="large-text" bind:this={statusElement}>
                Call us
            </p>
            
            <a class="button large-text" bind:this={fullEmailLinkElement} href="tel:+919990200700" target="_blank">+919990200700</a>
        </div>

        <div class="credits-wrapper" bind:this={creditsElement}>
            <p class="year">© {currentYear}</p>
            <p class="credits">
                Crave Medias<br>
                All Rights Reserved
            </p>
        </div>
    </div>

    <!-- Right side -->
	<div class="flex-wrapper decor">
        <img id="signature" class="name-signature" src="/assets/imgs/logo.svg" alt="logo">
            
    </div>
</div>


<style lang="sass">

@import "../consts.sass"
@include textStyles()

.footer-wrapper
    width: 100vw
    background-color: #131314
    display: flex
    flex-direction: row
    justify-content: space-between
    padding: 15vh 13vw
    box-sizing: border-box

    @media only screen and (max-width: 950px)
        .flex-wrapper.decor
            display: none !important

    @media only screen and (max-width: 950px)
        flex-direction: column-reverse

        .flex-wrapper:not(:first-child)
            margin-bottom: 15vh

    .inline-flex
        flex-grow: 1
        display: flex
        flex-direction: row
        align-items: center


    .logo-wrapper
        position: relative
        margin-bottom: 1vh

        .logo
            display: inline-block
            height: 20vh
            width: 20vh
            object-fit: cover

    .status-wrapper
        .button.large-text
            margin-top: 2vh

    .credits-wrapper
        margin-top: 5vh
        color: rgba(255,255,255,0.3)

        p.year
            margin-bottom: 1vh
            font-family: $font
            font-size: 1.8vh
            font-weight: normal
            color: rgba(255,255,255,0.3)

        .credits
            font-size: 1.5vh
            line-height: 125%
            white-space: nowrap
            color: rgba(255,255,255,0.3)

            .button
                color: rgba(255,255,255,0.3)

    .large-text
        font-size: 2.5vh

        @media only screen and (max-width: 950px)
            br
                display: none

    .flex-wrapper.decor
        display: flex
        flex-direction: column
        justify-content: center

        .name-signature
            width: 20vh

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

</style>