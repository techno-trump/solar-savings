<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * 
 *
 * @package WordPress
 * @subpackage Solar Savings
 * @since Solar Savings 1.0
 */
?>

<!DOCTYPE html>
<html lang=<?php bloginfo('language') ?>>

<head>

	<?php wp_head()?>
	<title>Calculate My Solar Savings</title>
	<meta charset=<?php bloginfo('charset'); ?>>
	<meta name="format-detection" content="telephone=no">
	<!-- <style>body{opacity: 0;}</style> -->
	<link rel="shortcut icon" href="favicon.ico">
	<!-- <meta name="robots" content="noindex, nofollow"> -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
	<div class="page">
		<div class="page__content">
			<div class="page__content-background">
				<div class="background">
					<div class="background__wrapper">
						<div class="background__decorations">
							<div class="background__decorations-wrapper">
								<div class="decoration-slide" data-idx="1">
									<div class="decoration-slide__wrapper">
										<div class="decoration-slide__img-wrapper">
											<img src="<?php bloginfo('template_url'); ?>/assets/img/background-decor-01/01.svg" alt="decor 01" class="decoration-slide__img">
										</div>
										<div class="decoration-slide__img-wrapper">
											<img src="<?php bloginfo('template_url'); ?>/assets/img/background-decor-01/02.svg" alt="decor 02" class="decoration-slide__img">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="page__content-wrapper">
				<div class="page__header">
					<?php get_header(); ?>
				</div>
				<main class="page__main">
				
				</main>
			</div>
		</div>
		<div class="page__footer">
			<?php get_footer(); ?>
		</div>
	</div>
</body>
</html>