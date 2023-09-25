<?php
/*
Template Name: home-short
Template Post Type: page
*/
?>
<?php function ss_app_add_input_options($name, $cbrFieldAlias, $valueAlias, $textAlias) {
	$inputOptionsList = carbon_get_theme_option($cbrFieldAlias);
	foreach($inputOptionsList as $option) {
		$fieldId = $name . '-' . $option[$valueAlias];
		echo '<div class="base-form__radio-field form-field form-field_radio">';
		echo '<input id="' . $fieldId . '" name="' . $name . '" type="radio" value="' . $option[$valueAlias] . '" class="form-field__input form-field__input_radio">';
		echo '<label for="' . $fieldId . '" class="form-field__radio-label">';
		echo $option[$textAlias];
		echo '</div>';
	}
}
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
		<div id="service-btns-for-pixel" style="display: none;">
			<button type="button" id="send-form-btn" class="summary-block-btn">Send form</button>
			<button type="button" id="schedule-appointment" class="summary-block-btn">Schedule appointment</button>
		</div>
		<div class="page__content">
			<div class="page__content-background">
				<div class="background">
					<div class="background__wrapper">
						<div class="background__decorations">
							<div class="background__decorations-wrapper">
								<div class="decoration-slide" data-idx="1">
									<div class="decoration-slide__wrapper">
										<div class="decoration-slide__img-wrapper">
											<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/background-decor-01/01.svg" alt="decor 01 01" class="decoration-slide__img">
										</div>
										<div class="decoration-slide__img-wrapper">
											<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/background-decor-01/02.svg" alt="decor 01 02" class="decoration-slide__img">
										</div>
									</div>
								</div>
								<div class="decoration-slide" data-idx="2">
									<div class="decoration-slide__wrapper">
										<div class="decoration-slide__img-wrapper">
											<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/background-decor-02/01.svg" alt="decor 02 01" class="decoration-slide__img">
										</div>
										<div class="decoration-slide__img-wrapper">
											<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/background-decor-02/02.svg" alt="decor 02 02" class="decoration-slide__img">
										</div>
									</div>
								</div>
								<div class="decoration-slide" data-idx="3">
									<div class="decoration-slide__wrapper">
										<div class="decoration-slide__img-wrapper">
											<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/background-decor-03/01.svg" alt="decor 02 01" class="decoration-slide__img">
										</div>
										<div class="decoration-slide__img-wrapper">
											<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/background-decor-03/02.svg" alt="decor 02 02" class="decoration-slide__img">
										</div>
									</div>
								</div>
								<div class="decoration-slide" data-idx="4">
									<div class="decoration-slide__wrapper">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="page__content-wrapper wrapper">
				<div class="page__header">
					<div class="page__header">
					<?php get_header(); ?>
				</div>
				</div>
				<main class="page__main">
					<section class="guide">
						<div class="guide__container">
							<div class="guide__wrapper">
								<h1 class="guide__title main-title">
									<?php echo carbon_get_theme_option('crb_main_title'); ?>
								</h1>
								<div class="guide__header">
									<div class="progress-bar guide__progress-bar"></div>
								</div>
								<div class="guide__sections">
									<div class="guide__main-form">
										<div class="step-page">
											<div class="step-page__row">
												<div class="step-page__congratulations">
													<h2 class="step-page__congratulations-title main-title">
														<?php echo carbon_get_theme_option('crb_phone_number_step_title'); ?>
													</h2>
													<h3 class="step-page__congratulations-subtitle">
														<?php echo carbon_get_theme_option('crb_phone_number_step_msg'); ?>
													</h3>
												</div>
											</div>
											<div class="step-page__row">
												<h3 class="step-page__question visible" data-step="avaragePowerBill">
													<?php echo carbon_get_theme_option('crb_power_bill_step_question'); ?>
												</h3>
												<h3 class="step-page__question" data-step="address">
													<?php echo carbon_get_theme_option('crb_address_step_question'); ?>
												</h3>
												<h3 class="step-page__question" data-step="homeType">
													<?php echo carbon_get_theme_option('crb_home_type_step_question'); ?>
												</h3>
												<h3 class="step-page__question" data-step="roofShade">
													<?php echo carbon_get_theme_option('crb_roof_shade_step_question'); ?>
												</h3>
												<h3 class="step-page__question" data-step="creditScore">
													<?php echo carbon_get_theme_option('crb_credit_score_step_question'); ?>
												</h3>
												<h3 class="step-page__question" data-step="contact">
													<?php echo carbon_get_theme_option('crb_contact_step_question'); ?>
												</h3>
												<h3 class="step-page__question" data-step="email">
													<?php echo carbon_get_theme_option('crb_email_step_question'); ?>
												</h3>
											</div>
											<div class="step-page__row">
												<form name="quiz" class="base-form step-page__form" autocomplete="on">
													<div class="step-page__form-inner">
														<div class="step-page__prev-btn-place">
															<button type="button" class="step-page-btn step-page__prev-btn" data-type="prev">
																<span class="icon-back-arrow"></span>
																<span class="step-page-btn__caption">
																	Back
																</span>
															</button>
														</div>
														<div class="step-page__inputs-place" data-step="avaragePowerBill">
															<div class="range">
																<div class="range__value-container" id="power-bill-indicator">
																	<div class="range__value">$210</div>
																</div>
																<div class="range__input-container">
																	<input id="avarage-bill-input" name="avarageBill" class="range__input" type="range" min="100" max="800" step="5" value="210" />
																</div>
																<div class="range__label-container">
																	<div class="range__label">$100</div>
																	<div class="range__label">$800</div>
																</div>
															</div>
														</div>
														<div class="step-page__inputs-place" data-step="address">
															<div class="base-form__address-field form-field">
																<div class="form-field__error">Error: address is incorrect</div>
																<input name="address" type="text" class="form-field__input" placeholder="Search (Enter your street Address)">
															</div>
														</div>
														<div class="step-page__inputs-place" data-step="homeType">
															<div class="base-form__row step-page__form-row">
																<?php
																	ss_app_add_input_options('homeType', 'crb_home_type_options', 'crb_home_type_option_value', 'crb_home_type_option_text');
																?>
															</div>
														</div>
														<div class="step-page__inputs-place" data-step="roofShade">
															<div class="base-form__row step-page__form-row">
																<?php
																	ss_app_add_input_options('roofShade', 'crb_roof_shade_options', 'crb_roof_shade_option_value', 'crb_roof_shade_option_text');
																?>
															</div>
														</div>
														<div class="step-page__inputs-place" data-step="creditScore">
															<div class="base-form__row step-page__form-row">
																<?php
																	ss_app_add_input_options('creditScore', 'crb_credit_score_options', 'crb_credit_score_option_value', 'crb_credit_score_option_text');
																?>
																
															</div>
														</div>
														<div class="step-page__inputs-place" data-step="contact">
															<div class="step-page__contact-form-section">
																<div class="contact-form-section">
																	<div class="contact-form-section__first-name-field form-field">
																		<div class="form-field__error"></div>
																		<input name="firstName" type="text" class="form-field__input" placeholder="Enter your first name">
																	</div>
																	<div class="contact-form-section__last-name-field form-field">
																		<div class="form-field__error"></div>
																		<input name="lastName" type="text" class="form-field__input" placeholder="Enter your last name">
																	</div>
																	<div class="contact-form-section__agreement-field form-field form-field_inline">
																		<div class="form-field__checkbox">
																			<input id="contact-isOwner" name="isOwner" type="checkbox" class="form-field__checkbox-input" checked>
																			<span class="form-field__checkbox-arrow icon-success-arrow"></span>
																		</div>
																		<label for="contact-isOwner" class="form-field__label"><?php echo carbon_get_theme_option('crb_contact_is_owner_caption') ?></label>
																	</div>
																</div>
															</div>
														</div>
														<div class="step-page__inputs-place" data-step="email">
															<div class="step-page__email-form-section">
																<div class="email-form-section">
																	<div class="email-form-section__email-field form-field">
																		<div class="form-field__error">Error: email is incorrect</div>
																		<input name="email" type="text" class="form-field__input" placeholder="Enter your email">
																	</div>
																</div>
																<div class="email-form-section__agreement-field form-field">
																	<div class="form-field__checkbox">
																		<input id="email-emailMe" name="emailMe" type="checkbox" class="form-field__checkbox-input" checked>
																		<span class="form-field__checkbox-arrow icon-success-arrow"></span>
																	</div>
																	<label for="email-emailMe" class="form-field__label"><?php echo carbon_get_theme_option('crb_email_email_me') ?></label>
																</div>
															</div>
														</div>
														<div class="step-page__inputs-place" data-step="phoneNumber">
															<div class="step-page__phone-form-section">
																<div class="phone-form-section">
																	<div class="phone-form-section__email-field form-field">
																		<div class="form-field__error">Error: phone number is incorrect</div>
																		<input name="phoneNumber" type="text" class="form-field__input" placeholder="Enter your phone number">
																	</div>
																</div>
															</div>
														</div>
														<div class="step-page__agreement" data-step="phoneNumber">
															<?php echo carbon_get_theme_option('crb_phone_number_privacy_policy') ?>
														</div>
														<div class="step-page__next-btn-place">
															<button type="button" class="step-page-btn step-page__next-btn" data-type="next">
																<span class="step-page-btn__caption">
																	Next
																</span>
																<span class="icon-next-arrow"></span>
															</button>
					<button type="button" class="step-page-btn step-page__next-btn" data-type="submit">
						<span class="step-page-btn__caption">
							View savings report
						</span>
						<span class="icon-next-arrow"></span>
					</button>
														</div>
													</div>
												</form>
											</div>
											<div class="step-page__row">
												<div class="step-page__cards-container">
													<div class="step-page__cards-inner">
														<div class="step-page__card-container">
															<div class="agitation-card step-page__card" data-step="avaragePowerBill">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_power_bill_left_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_power_bill_left_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="address">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_address_left_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_address_left_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="homeType">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-money-bag"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_home_type_left_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_home_type_left_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="roofShade">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-clock"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_roof_shade_left_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_roof_shade_left_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="creditScore">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_credit_score_left_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_credit_score_left_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="contact">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_contact_left_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_contact_left_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="email">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-message"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_email_left_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_email_left_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="phoneNumber">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-message"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_phone_number_left_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_phone_number_left_card_text'); ?>
																	</div>
																</div>
															</div>
														</div>
														<div class="step-page__card-container">
															<div class="agitation-card step-page__card" data-step="avaragePowerBill">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_power_bill_right_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_power_bill_right_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="address">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_address_right_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_address_right_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="homeType">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-flying-money"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_home_type_right_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_home_type_right_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="roofShade">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-cloud"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_roof_shade_right_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_roof_shade_right_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="creditScore">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_credit_score_right_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_credit_score_right_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="contact">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-message"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_contact_right_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_contact_right_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="email">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_email_right_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_email_right_card_text'); ?>
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="phoneNumber">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title"><?php echo carbon_get_theme_option('crb_phone_number_right_card_title'); ?></h4>
																	</div>
																	<div class="agitation-card__text">
																		<?php echo carbon_get_theme_option('crb_phone_number_right_card_text'); ?>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

									</div>
									<div class="guide__booking-page">
										<section class="booking-step">
											<section class="booking-step">
											<h2 class="booking-step__title main-title main-title_p2">
												<?php echo carbon_get_theme_option('crb_booking_step_title'); ?>
											</h2>
											<p class="booking-step__text" data-step="booking">
												<?php echo carbon_get_theme_option('crb_booking_step_heading_text'); ?>
											</p>
											<div class="booking-step__calculator">
												<div class="savings-calculator">
													<div class="savings-calculator__text">
														<?php echo carbon_get_theme_option('crb_booking_step_calculator_text'); ?>
													</div>
													<div class="savings-calculator__years-input">
														<div class="range">
															<div class="range__value-container" id="years-to-calculate-indicator">
																<div class="range__value">25 years</div>
															</div>
															<div class="range__input-container">
																<input id="years-to-calculate-input" name="yearsToCalculate" class="range__input" type="range" min="1" max="30" step="1" value="25" />
															</div>
															<div class="range__label-container">
																<div class="range__label">1 year</div>
																<div class="range__label">30 years</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="booking-step__text" data-step="booking">
												<?php echo carbon_get_theme_option('crb_booking_step_text'); ?>
											</div>
											<?php echo carbon_get_the_post_meta( 'crb_ghl_calendar_code' ); ?>
										</section>
									</div>
									<div class="guide__processing-page">
										<section class="processing-step">
											<h2 class="processing-step__title main-title" data-step="checkingRebates">
												<?php echo carbon_get_theme_option('crb_processing_step_checking_rebates_msg'); ?>
											</h2>
											<h2 class="processing-step__title main-title" data-step="processingForm">
												<?php echo carbon_get_theme_option('crb_processing_step_contact_processing_msg'); ?>
											</h2>
											<h2 class="processing-step__title main-title" data-step="processingBooking">
												<?php echo carbon_get_theme_option('crb_processing_step_booking_processing_msg'); ?>
											</h2>
											<div class="processing-step__indicator">
												<div class="processing-indicator">
													<div class="processing-indicator__bar"></div>
													<div class="processing-indicator__text">Loading...</div>
												</div>
											</div>
										</section>
									</div>
									<div class="guide__summary-page">
										<section class="summary">
											<h2 class="summary__title main-title"><?php echo carbon_get_theme_option('crb_summary_title'); ?></h2>
											<div class="summary__text"><?php echo carbon_get_theme_option('crb_summary_text'); ?></div>
											<div class="summary__blocks">
												<div class="summary__blocks-inner">
													<div class="summary__block">
														<div class="summary-block">
															<div class="summary-block__wrapper">
																<div class="summary-block__inner">
																	<div class="summary-block__header">
																		<h3 class="summary-block__title">
																			<span class="summary-block__title_p1">Step&nbsp;1:</span>
																			<span class="summary-block__title_p2"><?php echo carbon_get_theme_option('crb_summary_add_to_calendar_section_title'); ?></span>
																		</h3>
																	</div>
																	<div class="summary-block__body">
																		<div class="summary-block__body-inner">
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column">
																						<div class="summary-block__column-inner">
																							<ul class="summary-block__details">
																								<li class="summary-block-detail">
																									<div class="summary-block-detail__icon icon-calling"></div>
																									<div id="appointment-call-duration" class="summary-block-detail__text">{{duration}} minute phone call</div>
																								</li>
																								<li class="summary-block-detail">
																									<div class="summary-block-detail__icon icon-calendar"></div>
																									<div id="appointment-call-date-time" class="summary-block-detail__text">Thursday, November 24 2022</div>
																								</li>
																								<li class="summary-block-detail">
																									<div class="summary-block-detail__icon icon-simple-clock"></div>
																									<div id="appointment-call-timezone" class="summary-block-detail__text">01:30 PM, Pacific time (USA and Canada)</div>
																								</li>
																							</ul>
																						</div>
																					</div>
																					<div class="summary-block__column summary-block__column_rev">
																						<div class="summary-block__column-inner">
																							<a target="_blank" href="#" id="add-to-google-calendar" class="summary-block-btn summary-block-btn_pos-center summary-block__btn">
																								<div class="summary-block-btn__icon icon-calendar"></div>
																								<div class="summary-block-btn__caption">Add to Google Calendar</div>
																							</a>
																							<a target="_blank" href="#" id="add-to-outlook-calendar" class="summary-block-btn summary-block-btn_pos-center summary-block__btn">
																								<div class="summary-block-btn__icon icon-calendar"></div>
																								<div class="summary-block-btn__caption">Add to Outlook / iCal</div>
																							</a>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="summary__block">
														<div class="summary-block">
															<div class="summary-block__wrapper">
																<div class="summary-block__inner">
																	<div class="summary-block__header">
																		<h3 class="summary-block__title">
																			<span class="summary-block__title_p1">Step&nbsp;2:</span>
																			<span class="summary-block__title_p2"><?php echo carbon_get_theme_option('crb_summary_power_bill_section_title'); ?></span>
																		</h3>
																	</div>
																	<div class="summary-block__body">
																		<div class="summary-block__body-inner">
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column">
																						<div class="summary-block__column-inner">
																							<p class="summary-block__text">
																								<?php echo carbon_get_theme_option('crb_summary_power_bill_section_text'); ?>
																							</p>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column summary-block__column_max-width">
																						<div class="summary-block__column-inner">
																						<?php echo carbon_get_the_post_meta('crb_ghl_file_upload_code'); ?>
																						</div>
																					</div>
																				</div>
																			</div>
																			<!-- <div class="summary-block__row">
										<div class="summary-block__row-inner">
											<div class="summary-block__column summary-block__column_max-width">
												<div class="summary-block__column-inner">
													<a href="#" class="summary-block-btn summary-block-btn_pos-center">
														<div class="summary-block-btn__icon icon-document"></div>
														<div class="summary-block-btn__caption">Upload Utility Bill</div>
													</a>
												</div>
											</div>
										</div>
									</div> -->
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="summary__block">
														<div class="summary-block">
															<div class="summary-block__wrapper">
																<div class="summary-block__inner">
																	<div class="summary-block__header">
																		<h3 class="summary-block__title">
																			<span class="summary-block__title_p1">Step&nbsp;3:</span>
																			<span class="summary-block__title_p2"><?php echo carbon_get_theme_option('crb_summary_credit_check_section_title'); ?></span>
																		</h3>
																	</div>
																	<div class="summary-block__body">
																		<div class="summary-block__body-inner">
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column">
																						<div class="summary-block__column-inner">
																							<p class="summary-block__text">
																								<?php echo carbon_get_theme_option('crb_summary_credit_check_section_text'); ?>
																							</p>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column summary-block__column_max-width">
																						<div class="summary-block__column-inner">
																							<a target="_blank" href="<?php echo carbon_get_theme_option('crb_summary_credit_check_link'); ?>" class="summary-block-btn summary-block-btn_pos-center">
																								<div class="summary-block-btn__icon icon-activity"></div>
																								<div class="summary-block-btn__caption">Get Free Credit Score</div>
																							</a>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="summary__block">
														<div class="summary-block">
															<div class="summary-block__wrapper">
																<div class="summary-block__inner">
																	<div class="summary-block__header">
																		<h3 class="summary-block__title">
																			<span class="summary-block__title_p1">Step&nbsp;4:</span>
																			<span class="summary-block__title_p2"><?php echo carbon_get_theme_option('crb_summary_refer_friend_section_title'); ?></span>
																		</h3>
																	</div>
																	<div class="summary-block__body">
																		<div class="summary-block__body-inner">
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column">
																						<div class="summary-block__column-inner">
																							<p class="summary-block__text">
																								<?php echo carbon_get_theme_option('crb_summary_refer_friend_section_text'); ?>
																							</p>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column summary-block__column_max-width">
																						<div class="summary-block__column-inner">
																							<button type="button" class="summary-block-btn summary-block-btn_pos-center" data-popup="#referForm">
																								<div class="summary-block-btn__icon icon-add-user"></div>
																								<div class="summary-block-btn__caption">Refer a Friend</div>
																							</button>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="summary__block">
														<div class="summary-block">
															<div class="summary-block__wrapper">
																<div class="summary-block__inner">
																	<div class="summary-block__header">
																		<h3 class="summary-block__title">
																			<span class="summary-block__title_p1">Step&nbsp;5:</span>
																			<span class="summary-block__title_p2"><?php echo carbon_get_theme_option('crb_summary_video_section_title'); ?></span>
																		</h3>
																	</div>
																	<div class="summary-block__body">
																		<div class="summary-block__body-inner">
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column summary-block__column_max-width">
																						<div class="summary-block__column-inner">
																							<script src="//fast.wistia.com/embed/medias/<?php echo carbon_get_theme_option('crb_summary_video_integration_code'); ?>.jsonp?_v=20221125234127" async></script>
																							<script src="//fast.wistia.com/assets/external/E-v1.js?_v=20221125234127" async></script>
																							<div class="video-container summary-block__video-container">
																								<div class="video-container__inner">
																									<div class="wistia_embed wistia_async_<?php echo carbon_get_theme_option('crb_summary_video_integration_code'); ?>" style="height:100%;width:100%">&nbsp;</div>
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="summary__block">
														<div class="summary-block">
															<div class="summary-block__wrapper">
																<div class="summary-block__inner">
																	<div class="summary-block__header">
																		<h3 class="summary-block__title">
																			<span class="summary-block__title_p1">Step&nbsp;6:</span>
																			<span class="summary-block__title_p2">Frequently Asked Questions</span>
																		</h3>
																	</div>
																	<div class="summary-block__body">
																		<div class="summary-block__body-inner">
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column summary-block__column_max-width">
																						<div class="summary-block__column-inner">
																							<?php require get_stylesheet_directory() . '/faq-section.php'; ?>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</section>
									</div>
									<div class="guide__bad-summary-page">
										<section class="summary">
											<h2 id="bad-summary-title" class="summary__title main-title"><?php echo carbon_get_theme_option('crb_bad_summary_title'); ?></h2>
											<div class="summary__text">
												<?php echo carbon_get_theme_option('crb_bad_summary_text'); ?>
											</div>
											<div class="summary__blocks">
												<div class="summary__blocks-inner">
													<div class="summary__block">
														<div class="summary-block">
															<div class="summary-block__wrapper">
																<div class="summary-block__inner">
																	<div class="summary-block__header">
																		<h3 class="summary-block__title">
																			<span class="summary-block__title_p1">Step&nbsp;1:</span>
																			<span class="summary-block__title_p2"><?php echo carbon_get_theme_option('crb_bad_summary_refer_friend_section_title'); ?></span>
																		</h3>
																	</div>
																	<div class="summary-block__body">
																		<div class="summary-block__body-inner">
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column">
																						<div class="summary-block__column-inner">
																							<p class="summary-block__text">
																								<?php echo carbon_get_theme_option('crb_bad_summary_refer_friend_section_text'); ?>
																							</p>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column summary-block__column_max-width">
																						<div class="summary-block__column-inner">
																							<button type="button" class="summary-block-btn summary-block-btn_pos-center" data-popup="#referForm">
																								<div class="summary-block-btn__icon icon-add-user"></div>
																								<div class="summary-block-btn__caption">Refer a Friend</div>
																							</button>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="summary__block">
														<div class="summary-block">
															<div class="summary-block__wrapper">
																<div class="summary-block__inner">
																	<div class="summary-block__header">
																		<h3 class="summary-block__title">
																			<span class="summary-block__title_p1">Step&nbsp;2:</span>
																			<span class="summary-block__title_p2"><?php echo carbon_get_theme_option('crb_bad_summary_credit_repair_section_title'); ?></span>
																		</h3>
																	</div>
																	<div class="summary-block__body">
																		<div class="summary-block__body-inner">
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column">
																						<div class="summary-block__column-inner">
																							<p class="summary-block__text">
																								<?php echo carbon_get_theme_option('crb_bad_summary_credit_repair_section_text'); ?>
																							</p>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column summary-block__column_max-width">
																						<div class="summary-block__column-inner">
																							<a target="_blank" href="<?php echo carbon_get_theme_option('crb_bad_summary_credit_repair_link'); ?>" class="summary-block-btn summary-block-btn_pos-center">
																								<div class="summary-block-btn__icon icon-activity"></div>
																								<div class="summary-block-btn__caption">Repair My Credit</div>
																							</a>
																						</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>

												</div>
											</div>
										</section>
									</div>
									<div class="guide__article-page">
										<div class="article">
											<div class="article__inner">
												<div class="article__header">
													<nav class="article__nav">
														<a href="#" class="article-btn" data-link="back">
															<div class="article-btn__icon icon-back-arrow-v2"></div>
															<div class="article-btn__caption">Back</div>
														</a>
													</nav>
												</div>
												<div class="article__body">
													<!-- Inject iframe inside js -->
												</div>
											</div>
										</div>
									</div>

								</div>
								<script type="text/template" id="progress-bar-item">
									<div class="progress-bar__item progress-bar__item_hidden" data-idx={{idx}}>
					<div class="progress-bar__item-caption">{{caption}}</div>
					<div class="progress-bar__item-state">{{state}}</div>
				</div>
			</script>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
		<div class="page__footer">
			<?php get_footer(); ?>
		</div>
	</div>
	<div id="referForm" aria-hidden="true" class="popup">
		<div class="popup__wrapper">
			<div class="popup__content">
				<form target="_self" action="#" name="refer" class="refer-form">
					<div class="refer-form__header">
						<h3 class="refer-form__title">
							Refer a Friend
						</h3>
						<button data-close type="button" class="refer-form__close-btn popup__close">
							<span class="refer-form__close-btn-icon icon-close"></span>
						</button>
					</div>
					<div class="refer-form__body">
						<div class="refer-form__body-inner">
							<div class="refer-form__section refer-form__section_s100p">
								<div class="refer-form__section-inner">
									<p class="refer-form__text">
										Earn $500 for every solar installation you refer and more as your network grows!
									</p>
								</div>
							</div>
							<div class="refer-form__section refer-form__section_s50p">
								<div class="refer-form__section-inner">
									<div class="refer-form__first-name-field form-field">
										<div class="form-field__error">Error: this field is required</div>
										<input required name="referFirstName" type="text" class="form-field__input" placeholder="Enter first name *">
									</div>
								</div>
							</div>
							<div class="refer-form__section refer-form__section_s50p">
								<div class="refer-form__section-inner">
									<div class="refer-form__last-name-field form-field">
										<div class="form-field__error">Error: this field is required</div>
										<input required name="referLastName" type="text" class="form-field__input" placeholder="Enter last name *">
									</div>
								</div>
							</div>
							<div class="refer-form__section refer-form__section_s50p">
								<div class="refer-form__section-inner">
									<div class="refer-form__email-field form-field">
										<div class="form-field__error">Error: this field is required</div>
										<input name="referEmail" type="email" class="form-field__input" placeholder="Enter email">
									</div>
								</div>
							</div>
							<div class="refer-form__section refer-form__section_s50p">
								<div class="refer-form__section-inner">
									<div class="refer-form__phone-field form-field">
										<div class="form-field__error"></div>
										<input required name="referPhone" type="tel" class="form-field__input" placeholder="Enter phone number *">
									</div>
								</div>
							</div>
							<div class="refer-form__section refer-form__section_s100p">
								<div class="refer-form__section-inner">
									<div id="referFormProcessingResult" class="refer-form__processing-result">
										Your referral is submitted!
									</div>
								</div>
							</div>
							<div class="refer-form__section refer-form__section_s100p">
								<div class="refer-form__section-inner">
									<button id="submit-refer-btn" type="button" class="summary-block-btn summary-block-btn_pos-center">
										<div class="summary-block-btn__caption">Submit Your Referral</div>
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div id="errorMsg" aria-hidden="true" class="popup">
		<div class="popup__wrapper">
			<div class="popup__content">
				<div class="error-popup">
					<div class="error-popup__header">
						Error in the system. Please try to reload the page or contact the owner.
					</div>
					<div class="error-popup__text">
						Error in the system. Please try to reload the page or contact the owner.
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="js/app.min.js?_v=20221125234127"></script>
	<script async src="https://maps.googleapis.com/maps/api/js?key=<?php echo carbon_get_theme_option('crb_google_api_key'); ?>&libraries=places&language=en&callback=initGoogleApi&_v=20221125234127">
	</script>
	<script type="text/template" id="post_id"><?php echo get_the_ID(); ?></script>
</body>

</html>