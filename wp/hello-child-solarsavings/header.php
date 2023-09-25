<?php
/**
 * Header file for the Solar Savings theme
 *
 * @link
 *
 * @package WordPress
 * @subpackage Solar Savings
 * @since Solar Savings 1.0
 */

?>
<!DOCTYPE html>
<header class="header">
	<div class="header__container">
		<div class="header__wrapper">
			<div class="header__logo">
				<figure class="logo">
					<a href="." class="logo__link">
						<img src="<?php echo carbon_get_theme_option('crb_main_logo') ?>" alt="" class="logo__img">
					</a>
				</figure>
			</div>
			<div class="header__security-logo">
				<figure class="security-logo">
					<div class="security-logo__link">
						<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/logo_lock.svg" alt="" class="security-logo__img">
						<figcaption class="security-logo__title">
							100% Secure
						</figcaption>
						<figcaption class="security-logo__subtitle">
							Safe & Confidential!
						</figcaption>
					</div>
				</figure>
			</div>
		</div>
	</div>
</header>