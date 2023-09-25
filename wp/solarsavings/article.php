<?php
/*
Template Name: article
Template Post Type: page
*/
?>
<?php wp_head(); ?>
<div class="article-frame">
	<h2 class="article-frame__title"><?php the_title();?></h2>
	<h2 class="article-frame__text"><?php the_content();?></h2>
</div>
<script type="text/javascript"> 
	window.addEventListener('load', function() {
		let payload = { height: document.body.scrollHeight };

		// window.top refers to parent window
		window.parent.postMessage({ action: "iframeHeightReport", payload }, "*");
		console.log("post message");
	});
</script>
<?php wp_footer(); ?>