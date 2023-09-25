<?php
/**
 * Theme functions and definitions
 *
 * @package SolarsavingsQuiz
 */

	require get_stylesheet_directory() . '/rest-api.php';
	add_action( 'rest_api_init', 'add_custom_routs');
		
	add_action( 'carbon_fields_register_fields', 'crb_register_custom_fields' );

	add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );
	add_action( 'wp_enqueue_scripts', 'dequeue_elementor_scipts', 9999999 );

	add_theme_support('post-thumbnails');
	add_theme_support('title-tag');
	add_theme_support('custom-logo');

	add_filter('jpeg_quality', function($arg){return 85;});

	add_image_size( '400wide', '400', '0', false );
	add_image_size( '600wide', '600', '0', false );
	add_image_size( '800wide', '800', '0', false );
	add_image_size( '1200wide', '1200', '0', false );
	add_image_size( '1400wide', '1400', '0', false );


	function crb_register_custom_fields() {
		require get_stylesheet_directory() . '/carbon-fields/theme-metabox.php';
		require get_stylesheet_directory() . '/carbon-fields/page-metabox.php';
	}

	function dequeue_elementor_scipts() {
		if (is_page_template( 'home.php' ) || is_page_template( 'home-short.php' ) || is_page_template( 'article.php' ) || is_page_template( 'develop.php' )) {
			wp_dequeue_style('elementor-frontend');
			wp_dequeue_style('elementor-post-7');
			wp_dequeue_style('elementor-pro');
			wp_dequeue_style('elementor-global');
			wp_dequeue_style('elementor-post-25');
			wp_dequeue_style('elementor-post-54');
			wp_dequeue_style('elementor-post-50');
			wp_dequeue_style('ecs-styles');
			wp_dequeue_style('global-styles');
			wp_dequeue_style('classic-theme-styles');
			wp_dequeue_style('elementor-post-4272');
			wp_dequeue_style('elementor-icons');
			wp_dequeue_style('elementor-pro-notes-frontend');
			wp_dequeue_style('elementor-common');
			wp_dequeue_style('google-fonts-1-css');
			wp_dequeue_style('hello-elementor');
			wp_dequeue_style('hello-elementor-theme-style');
			wp_dequeue_style('hello-elementor-css');
			wp_dequeue_style('hello-elementor-theme-style-css');
		}
	}

	function add_theme_scripts() {
		if (is_page_template( 'home.php' )) {
			wp_enqueue_style( 'main-styles',
				get_stylesheet_directory_uri() . '/assets/css/style.min.css',
				array(),
				'1.0.14',
				false
			);
			wp_enqueue_script( 'app-js', get_stylesheet_directory_uri() . '/assets/js/app.min.js', array(), '1.0.14', true);
		} else if (is_page_template( 'home-short.php' )) {
			wp_enqueue_style( 'main-styles',
				get_stylesheet_directory_uri() . '/assets/css/style.short.min.css',
				array(),
				'1.0.15',
				false
			);
			wp_enqueue_script( 'app-js', get_stylesheet_directory_uri() . '/assets/js/app.short.min.js', array(), '1.0.15', true);
		} else if (is_page_template( 'develop.php' )) {
			wp_enqueue_style( 'main-styles',
				get_stylesheet_directory_uri() . '/assets/css/style.dev.min.css',
				array(),
				'1.0.14',
				false
			);
			wp_enqueue_script( 'app-js', get_stylesheet_directory_uri() . '/assets/js/app.dev.js', array(), '1.0.14', true);
		}
	}
?>
