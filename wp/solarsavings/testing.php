<?php
/*
Template Name: testing
Template Post Type: page
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
											<img src="<?php bloginfo('template_url'); ?>/assets/img/background-decor-01/01.svg" alt="decor 01 01" class="decoration-slide__img">
										</div>
										<div class="decoration-slide__img-wrapper">
											<img src="<?php bloginfo('template_url'); ?>/assets/img/background-decor-01/02.svg" alt="decor 01 02" class="decoration-slide__img">
										</div>
									</div>
								</div>
								<div class="decoration-slide" data-idx="2">
									<div class="decoration-slide__wrapper">
										<div class="decoration-slide__img-wrapper">
											<img src="<?php bloginfo('template_url'); ?>/assets/img/background-decor-02/01.svg" alt="decor 02 01" class="decoration-slide__img">
										</div>
										<div class="decoration-slide__img-wrapper">
											<img src="<?php bloginfo('template_url'); ?>/assets/img/background-decor-02/02.svg" alt="decor 02 02" class="decoration-slide__img">
										</div>
									</div>
								</div>
								<div class="decoration-slide" data-idx="3">
									<div class="decoration-slide__wrapper">
										<div class="decoration-slide__img-wrapper">
											<img src="<?php bloginfo('template_url'); ?>/assets/img/background-decor-03/01.svg" alt="decor 02 01" class="decoration-slide__img">
										</div>
										<div class="decoration-slide__img-wrapper">
											<img src="<?php bloginfo('template_url'); ?>/assets/img/background-decor-03/02.svg" alt="decor 02 02" class="decoration-slide__img">
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
					<?php get_header(); ?>
				</div>
				<main class="page__main">
					<section class="guide">
						<div class="guide__container">
							<div class="guide__wrapper">
								<h1 class="guide__title main-title">
									See How Much You Can <span class="main-title_p2"> Save&nbsp;with&nbsp;Solar</span>&nbsp;!
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
														<span class="main-title_p2">Your Report Is Ready!</span> See If You Qualify For Solar Incentives
													</h2>
													<h3 class="step-page__congratulations-subtitle">
														Please complete this last step to view your savings.
													</h3>
												</div>
											</div>
											<div class="step-page__row">
												<h3 class="step-page__question visible" data-step="avaragePowerBill">
													What’s your average monthly power bill?
												</h3>
												<h3 class="step-page__question" data-step="address">
													What’s your property address?
												</h3>
												<h3 class="step-page__question" data-step="homeType">
													What is your home type?
												</h3>
												<h3 class="step-page__question" data-step="roofShade">
													How much roof shade do you get?
												</h3>
												<h3 class="step-page__question" data-step="creditScore">
													What is your credit score?
												</h3>
												<h3 class="step-page__question" data-step="contact">
													Who is this savings report for?
												</h3>
												<h3 class="step-page__question" data-step="email">
													Where should we email your savings report?
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
																	<input name="avarageBill" class="range__input" type="range" min="100" max="800" step="5" value="210" />
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
																<div class="base-form__radio-field form-field form-field_radio">
																	<input id="homeType-singleFamily" name="homeType" type="radio" value="singleFamily" class="form-field__input form-field__input_radio">
																	<label for="homeType-singleFamily" class="form-field__radio-label">
																		Single Family Home
																	</label>
																</div>
																<div class="base-form__radio-field form-field form-field_radio">
																	<input id="homeType-apartment" name="homeType" type="radio" value="apartment" class="form-field__input form-field__input_radio">
																	<label for="homeType-apartment" class="form-field__radio-label">
																		Condo or Apartment
																	</label>
																</div>
																<div class="base-form__radio-field form-field form-field_radio">
																	<input id="homeType-mobile" name="homeType" type="radio" value="mobile" class="form-field__input form-field__input_radio">
																	<label for="homeType-mobile" class="form-field__radio-label">
																		Mobile Home
																	</label>
																</div>
															</div>
														</div>
														<div class="step-page__inputs-place" data-step="roofShade">
															<div class="base-form__row step-page__form-row">
																<div class="base-form__radio-field form-field form-field_radio">
																	<input id="roofShade-noShade" name="roofShade" type="radio" value="noShade" class="form-field__input form-field__input_radio">
																	<label for="roofShade-noShade" class="form-field__radio-label">
																		No Shade
																	</label>
																</div>
																<div class="base-form__radio-field form-field form-field_radio">
																	<input id="roofShade-someShade" name="roofShade" type="radio" value="someShade" class="form-field__input form-field__input_radio">
																	<label for="roofShade-someShade" class="form-field__radio-label">
																		Some Shade
																	</label>
																</div>
																<div class="base-form__radio-field form-field form-field_radio">
																	<input id="roofShade-severeShade" name="roofShade" type="radio" value="severeShade" class="form-field__input form-field__input_radio">
																	<label for="roofShade-severeShade" class="form-field__radio-label">
																		Severe Shade
																	</label>
																</div>
																<div class="base-form__radio-field form-field form-field_radio">
																	<input id="roofShade-uncertain" name="roofShade" type="radio" value="uncertain" class="form-field__input form-field__input_radio">
																	<label for="roofShade-uncertain" class="form-field__radio-label">
																		Uncertain
																	</label>
																</div>
															</div>
														</div>
														<div class="step-page__inputs-place" data-step="creditScore">
															<div class="base-form__row step-page__form-row">
																<div class="base-form__radio-field form-field form-field_radio">
																	<input id="creditScore-above600" name="creditScore" type="radio" value="above600" class="form-field__input form-field__input_radio">
																	<label for="creditScore-above600" class="form-field__radio-label">
																		Above 600
																	</label>
																</div>
																<div class="base-form__radio-field form-field form-field_radio">
																	<input id="creditScore-below600" name="creditScore" type="radio" value="below600" class="form-field__input form-field__input_radio">
																	<label for="creditScore-below600" class="form-field__radio-label">
																		Below 600
																	</label>
																</div>
																<div class="base-form__radio-field form-field form-field_radio">
																	<input id="creditScore-notSure" name="creditScore" type="radio" value="notSure" class="form-field__input form-field__input_radio">
																	<label for="creditScore-notSure" class="form-field__radio-label">
																		I’m not sure
																	</label>
																</div>
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
																		<label for="contact-isOwner" class="form-field__label">I am the owner and/or have authority with respect to this property.</label>
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
																	<label for="email-emailMe" class="form-field__label">Email me a link to my report</label>
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
															By clicking the submit button, you hereby agree to the
															<a href="#" class="step-page__agreement-link">Privacy Policy</a> and
															<a href="#" class="step-page__agreement-link">Terms & Conditions</a>. You also hereby consent to receive marketing
															communications via automated telephone dialing system and/or pre-recorded calls, text messages, and/or emails from
															our <a href="#" class="step-page__agreement-link">Service Providers and Partners</a> at the phone number, physical
															address and email address provided above, even if you are on any State and/or Federal Do Not Call list.
															Consent is not a condition of purchase and may be revoked at any time. Message and data rates may apply.
															<a href="#" class="step-page__agreement-link">California Residents.</a>
														</div>
														<div class="step-page__next-btn-place">
															<button type="button" class="step-page-btn step-page__next-btn" data-type="next">
																<span class="step-page-btn__caption">
																	Next
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
																		<h4 class="agitation-card__title">100% Confidential</h4>
																	</div>
																	<div class="agitation-card__text">
																		Your information will be kept private and only used to determine what you qualify for.
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="address">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title">For Verification Only.</h4>
																	</div>
																	<div class="agitation-card__text">
																		We do not mail.
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="homeType">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-money-bag"></span>
																		<h4 class="agitation-card__title">Reduce Your Power Bill</h4>
																	</div>
																	<div class="agitation-card__text">
																		Reduce your power bill and start saving day 1!
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="roofShade">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-clock"></span>
																		<h4 class="agitation-card__title">Fast & Free</h4>
																	</div>
																	<div class="agitation-card__text">
																		We never charge for our service, and we never will. Keep going, you’re almost at the finish line!
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="creditScore">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title">Why we need this!</h4>
																	</div>
																	<div class="agitation-card__text">
																		Some of the programs require good credit.
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="contact">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title">SSL Encryption</h4>
																	</div>
																	<div class="agitation-card__text">
																		We use the latest security technology to ensure that your info is 100% safe. Our customers are our #1 priority - always.
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="email">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-message"></span>
																		<h4 class="agitation-card__title">We take privacy seriously.</h4>
																	</div>
																	<div class="agitation-card__text">
																		No Spam whatsoever!
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="phoneNumber">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-message"></span>
																		<h4 class="agitation-card__title">We take privacy seriously.</h4>
																	</div>
																	<div class="agitation-card__text">
																		No Spam whatsoever!
																	</div>
																</div>
															</div>
														</div>
														<div class="step-page__card-container">
															<div class="agitation-card step-page__card" data-step="avaragePowerBill">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title">Why We Need This</h4>
																	</div>
																	<div class="agitation-card__text">
																		Your current energy costs usage help us determine how much you can save by going solar.
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="address">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title">Why We Need This</h4>
																	</div>
																	<div class="agitation-card__text">
																		We will use this information to find your home’s positioning to the sun.
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="homeType">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-flying-money"></span>
																		<h4 class="agitation-card__title">Earn Money with Your System</h4>
																	</div>
																	<div class="agitation-card__text">
																		Run your meter backwards for credits with your utility!
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="roofShade">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-cloud"></span>
																		<h4 class="agitation-card__title">This Is Important</h4>
																	</div>
																	<div class="agitation-card__text">
																		Trees shading a homeowner’s roof is common. But it’s best for the solar installer to know just how much shade we’re talking!
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="creditScore">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title">100% Confidential</h4>
																	</div>
																	<div class="agitation-card__text">
																		Your information will be kept private and only used to determine what you qualify for.
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="contact">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-message"></span>
																		<h4 class="agitation-card__title">We Never Spam</h4>
																	</div>
																	<div class="agitation-card__text">
																		No email lists with Calculatemysolarsavings. We respect your privacy, and will only connect you to matching solar installers.
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="email">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title">100% Confidential</h4>
																	</div>
																	<div class="agitation-card__text">
																		Your information will be kept private and only used to determine what you qualify for.
																	</div>
																</div>
															</div>
															<div class="agitation-card step-page__card" data-step="phoneNumber">
																<div class="agitation-card__wrapper">
																	<div class="agitation-card__header">
																		<span class="agitation-card__icon icon-ssl"></span>
																		<h4 class="agitation-card__title">100% Confidential</h4>
																	</div>
																	<div class="agitation-card__text">
																		Your information will be kept private and only used to determine what you qualify for.
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
											<h2 class="booking-step__title main-title main-title_p2">
												Congrats {{firstName}}!
											</h2>
											<p class="booking-step__text" data-step="booking">
												You’ve been approved to get solar for no upfront cost.
											</p>
											<p class="booking-step__text" data-step="booking">
												Grab a spot on our calendar to see how much you can save with solar and what incentives you qualify for.
											</p>
											<p class="booking-step__text" data-step="booking">
												<span class="booking-step__text_p2">You’ll like our energy advisors, they’re friendly!</span> If they aren’t, let us know and we’ll punish them.
											</p>
											<iframe name="calendar" src="https://api.leadconnectorhq.com/widget/appointment/service/1?group=cmss-appointment-setters" style="width: 100%;border:none;overflow: hidden;" scrolling="no" id="0wGGwJvARPFfn6gGDepH_1668853534144"></iframe><br>
											<script src="https://api.leadconnectorhq.com/js/form_embed.js?_v=20221124204948" type="text/javascript"></script>
											<!-- <iframe src="https://api.leadconnectorhq.com/widget/appointment/service/english?group=powering-earth-discovery"
		style="width: 100%;border:none;overflow: hidden;"
		scrolling="no"
		id="LBJEzhPt12SIckulDweI_1668110383294">
	</iframe> -->
											<script src="https://api.leadconnectorhq.com/js/form_embed.js?_v=20221124204948" type="text/javascript">
											</script>
										</section>
									</div>
									<div class="guide__processing-page">
										<section class="processing-step">
											<h2 class="processing-step__title main-title" data-step="checkingRebates">
												Checking Local Rebates & Incentives
											</h2>
											<h2 class="processing-step__title main-title" data-step="processingForm">
												Processing your information
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
											<h2 class="summary__title main-title">{{firstName}} your consultation is booked!</h2>
											<div class="summary__text">Here’s how to prepare for your call:</div>
											<div class="summary__blocks">
												<div class="summary__blocks-inner">
													<div class="summary__block">
														<div class="summary-block">
															<div class="summary-block__wrapper">
																<div class="summary-block__inner">
																	<div class="summary-block__header">
																		<h3 class="summary-block__title">
																			<span class="summary-block__title_p1">Step&nbsp;1:</span>
																			<span class="summary-block__title_p2">Add to Your Calendar</span>
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
																			<span class="summary-block__title_p2">Most Recent Electric Bill</span>
																		</h3>
																	</div>
																	<div class="summary-block__body">
																		<div class="summary-block__body-inner">
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column">
																						<div class="summary-block__column-inner">
																							<p class="summary-block__text">
																								To accurately design your energy system, please upload a recent electric utility bill. The bill will include the account holder’s name, home service address, 12 months of usage or total annual usage, and your meter number.
																							</p>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column summary-block__column_max-width">
																						<div class="summary-block__column-inner">
																							<iframe src="https://api.leadconnectorhq.com/widget/form/xBvdUGP2lgfkfh2fRoPZ" style="border:none;width:100%;" scrolling="no" id="xBvdUGP2lgfkfh2fRoPZ"></iframe>
																							<script src="https://api.leadconnectorhq.com/js/form_embed.js?_v=20221124204948"></script>
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
																			<span class="summary-block__title_p2">Free Credit Check</span>
																		</h3>
																	</div>
																	<div class="summary-block__body">
																		<div class="summary-block__body-inner">
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column">
																						<div class="summary-block__column-inner">
																							<p class="summary-block__text">
																								To accurately design your energy system, please upload a recent electric utility bill. The bill will include the account holder’s name, home service address, 12 months of usage or total annual usage, and your meter number.
																							</p>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column summary-block__column_max-width">
																						<div class="summary-block__column-inner">
																							<a target="_blank" href="https://www.creditkarma.com/" class="summary-block-btn summary-block-btn_pos-center">
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
																			<span class="summary-block__title_p2">Earn By Referring Your Friends</span>
																		</h3>
																	</div>
																	<div class="summary-block__body">
																		<div class="summary-block__body-inner">
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column">
																						<div class="summary-block__column-inner">
																							<p class="summary-block__text">
																								Earn $500 for every solar installation you refer and more as your network grows!
																							</p>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column summary-block__column_max-width">
																						<div class="summary-block__column-inner">
																							<button type="button" class="summary-block-btn summary-block-btn_pos-center" data-popup="#popup">
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
																			<span class="summary-block__title_p2">See Why Millions Have Switched To Solar</span>
																		</h3>
																	</div>
																	<div class="summary-block__body">
																		<div class="summary-block__body-inner">
																			<div class="summary-block__row">
																				<div class="summary-block__row-inner">
																					<div class="summary-block__column summary-block__column_max-width">
																						<div class="summary-block__column-inner">
																							<script src="//fast.wistia.com/embed/medias/s3lqfi0zn7.jsonp?_v=20221124204948" async></script>
																							<script src="//fast.wistia.com/assets/external/E-v1.js?_v=20221124204948" async></script>
																							<div class="video-container summary-block__video-container">
																								<div class="video-container__inner">
																									<div class="wistia_embed wistia_async_s3lqfi0zn7" style="height:100%;width:100%">&nbsp;</div>
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
																							<div class="accordion">
																								<div class="accordion__item">
																									<div class="accordion__item-header">
																										<h3 class="accordion__item-title">
																											Why should I consider a home solar system?
																										</h3>
																										<div class="accordion__item-header-icon"></div>
																									</div>
																									<div class="accordion__item-body">
																										In the US, there are tens of millions of solar-powered homes, and many reasons for going solar. Most often, people go solar to reduce the amount they pay for energy, to increase their homes value, and to power their home on a cleaner source of energy that is more environmentally friendly. A home solar system provides an opportunity for anyone who is looking to lower monthly electricity bills and make a long-term, low-risk investment that's good for the planet.
																									</div>
																								</div>
																								<div class="accordion__item">
																									<div class="accordion__item-header">
																										<h3 class="accordion__item-title">
																											How can I purchase a home solar system?
																										</h3>
																										<div class="accordion__item-header-icon"></div>
																									</div>
																									<div class="accordion__item-body">
																										There are several methods to go solar, but working with a professional installer is the best option. A qualified installer can securely install a solar system on your home, as well as assist you plan it and get the required equipment and permits. Many installers have connections with solar finance organizations that can assist you with a solar loan if you do not intend to pay in cash.
																									</div>
																								</div>
																								<div class="accordion__item">
																									<div class="accordion__item-header">
																										<h3 class="accordion__item-title">
																											Will my solar system work in a grid outage?
																										</h3>
																										<div class="accordion__item-header-icon"></div>
																									</div>
																									<div class="accordion__item-body">
																										Solar systems can be divided into two categories: "grid-tied" systems and "grid-agnostic" systems. Grid-tied systems only allow you to use your solar energy when the grid is operational. You can't use solar power if the grid goes down. This safety measure prevents power from returning to the system while repairs are being made. Grid-agnostic systems contain a switch that can temporarily disconnect a house from the grid, letting you use solar power in an outage. Although solar-only grid-agnostic systems have recently entered the market, solar-plus-battery systems still make up the majority of these systems.
																									</div>
																								</div>
																								<div class="accordion__item">
																									<div class="accordion__item-header">
																										<h3 class="accordion__item-title">
																											When is the best time to go solar?
																										</h3>
																										<div class="accordion__item-header-icon"></div>
																									</div>
																									<div class="accordion__item-body">
																										Due to inflation, rising interest rates, and most utility companies increasing their rates year-over-year, it typically makes the most sense to go solar as soon as you can. In most instances, solar can be installed year round.
																									</div>
																								</div>
																								<div class="accordion__item">
																									<div class="accordion__item-header">
																										<h3 class="accordion__item-title">
																											How much will it cost me to put solar panels on my home?
																										</h3>
																										<div class="accordion__item-header-icon"></div>
																									</div>
																									<div class="accordion__item-body">
																										In most instances, you can get solar panels on your home at no upfront cost if you choose to purchase your panels with a loan or a PPA (Power Purchase Agreement). With a loan, you will typically pay substantially less than what you currently pay in energy, and completely avoid rising energy costs due to utility companies increasing their rates, or inflation. A loan will typically include the cost of all the panels, permitting, and installation.
																										In regards to the cost of the panels, it is first useful to understand that the cost of solar systems is expressed in "dollars per watt." The total number of solar panels is used to calculate the size of the entire system. Solar panels have wattage ratings. According to the Solar Energy Industries Association, the typical size of a solar system in the United States is 5 kilowatts (5,000 watts), or 20 solar panels with a 250 watt capacity each (SEIA). The price per watt is calculated by dividing the whole cost of installing a system, which includes labor, inverters, and other equipment, by 5kW.
																										The SEIA3 reports that in 2020 and 2021, the average cost of a solar system was about $3/watt. In accordance with that, a 5kW system at $3/watt — a typical-sized system at a typical price — would cost $15,000 to purchase.
																										The best method to understand charges is to speak with an installer. The components you select are one of many additional factors that affect price.
																									</div>
																								</div>
																								<div class="accordion__item">
																									<div class="accordion__item-header">
																										<h3 class="accordion__item-title">
																											How long will my solar panels last?
																										</h3>
																										<div class="accordion__item-header-icon"></div>
																									</div>
																									<div class="accordion__item-body">
																										Solar systems have a long lifespan, and should last decades. Many significant solar panel manufacturers offer 25-year production warranties. An installer is the best source for learning about the lifetime worth of a solar system because they can put together a proposal that lists the warranties and the lifespan of the different systems.
																									</div>
																								</div>
																								<div class="accordion__item">
																									<div class="accordion__item-header">
																										<h3 class="accordion__item-title">
																											Are there any incentives for switching to solar?
																										</h3>
																										<div class="accordion__item-header-icon"></div>
																									</div>
																									<div class="accordion__item-body">
																										The Federal Investment Tax Credit (ITC), or as the U.S. Department of Energy4 puts it, "a dollar-for-dollar decrease in the amount of income tax you would otherwise owe," is the biggest incentive for installing household solar. The Federal ITC will start offering a 30% tax credit for solar installations on September 1, 2022. Additionally, there are frequent state and municipal advantages. Your tax advisor may explain these incentives to you and possibly assist you in claiming them.
																									</div>
																								</div>
																								<div class="accordion__item">
																									<div class="accordion__item-header">
																										<h3 class="accordion__item-title">
																											How will a home solar system increase the value of my home?
																										</h3>
																										<div class="accordion__item-header-icon"></div>
																									</div>
																									<div class="accordion__item-body">
																										Instead of paying your electric company and getting nothing but energy in return, by switching to solar, you’ll instead be paying for an asset rather than a liability. Solar is a lot like switching as a renter to owning a home. Instead of paying rent, you now pay for a mortgage. The difference is, with a mortgage, you have equity in your home to show for your payments at the end of the day, unlike paying rent. The same goes for a home solar system. Your payments go towards paying off an asset that you own, instead of an expensive commodity that continually goes up in price that you will continue to pay on an ongoing basis.
																									</div>
																								</div>
																								<div class="accordion__item">
																									<div class="accordion__item-header">
																										<h3 class="accordion__item-title">
																											Why do some homeowners add batteries to their solar system?
																										</h3>
																										<div class="accordion__item-header-icon"></div>
																									</div>
																									<div class="accordion__item-body">
																										More than 29% of systems constructed in 2025, up from around 10% in 2021, will have battery storage added, according to the Solar Energy Industries Association. Battery storage is becoming more and more popular among homeowners. One reason is to have electricity at home in case the grid goes down. When the grid fails, conventional "grid-tied" solar systems are unable to power a residence. Some people decide to employ battery storage to store any additional solar energy generated during the day for usage at night.
																									</div>
																								</div>
																								<div class="accordion__item">
																									<div class="accordion__item-header">
																										<h3 class="accordion__item-title">
																											How does home solar save money for homeowners?
																										</h3>
																										<div class="accordion__item-header-icon"></div>
																									</div>
																									<div class="accordion__item-body">
																										In most instances, you’ll pay much less towards the payments of a solar system than you would toward your current energy provider. That being said, the amount of money that may be saved depends on a number of things, including how much power you use, the size and cost of your solar system, whether you paid cash, took out a loan, or leased it, and your region's electricity prices. You can estimate how much money you'll be able to save by working with professional installer, who can also assist you grasp all these elements.
																									</div>
																								</div>
																								<div class="accordion__item">
																									<div class="accordion__item-header">
																										<h3 class="accordion__item-title">
																											What financial options are available for going solar?
																										</h3>
																										<div class="accordion__item-header-icon"></div>
																									</div>
																									<div class="accordion__item-body">
																										You can go solar in a number of ways. One option is to pay for a solar system in full up front, much like you would for a car. A loan can be used to pay for a solar system as well. In leases or Power Purchase Agreements, some solar businesses let you pay a set fee for the energy your solar system generates while they own the installation on your house. Your possibilities can be better understood with the assistance of a solar installation, many of whom have connections to solar financing companies.
																									</div>
																								</div>
																								<div class="accordion__item">
																									<div class="accordion__item-header">
																										<h3 class="accordion__item-title">
																											What about my electric vehicle, can I charge it with my home solar system?
																										</h3>
																										<div class="accordion__item-header-icon"></div>
																									</div>
																									<div class="accordion__item-body">
																										As more drivers adopt electric vehicles, the prospect of going solar gets even better. A car plugged in and charging during the day at a solar home is fueling up on sunshine, which is cheaper and cleaner than other automotive fuel sources.
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
	<div id="popup" aria-hidden="true" class="popup">
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
	<script src="js/app.min.js?_v=20221124204948"></script>
	<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBakw6X3sf5qMZxwao-kLLrdIt-VqKhm8&libraries=places&language=en&callback=initGoogleApi&_v=20221124204948">
	</script>
</body>

</html>