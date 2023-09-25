<?php
	use Carbon_Fields\Container;
	use Carbon_Fields\Field;
	
	Container::make( 'theme_options', 'New design control' )
		->add_tab('Main fields', array(
			Field::make( 'image', 'crb_main_logo', __( 'Logo' ) )
				->set_value_type( 'url' ),
			Field::make( 'rich_text', 'crb_main_title', 'Main Title')
				->set_default_value('See How Much You Can <span class="main-title_p2"> Save&nbsp;with&nbsp;Solar</span>&nbsp;!')
				->set_required( true ),
			Field::make( 'text', 'crb_google_api_key', 'Google API Key')
				->set_default_value('AIzaSyAzKgasm0eB7tXP-FMXZ-9iKNNU00Yl7Y0')
				->set_required( true ),
			Field::make( 'text', 'crb_main_ghl_bearer', 'Main GHL account Bearer')
				->set_default_value('ad25c3dd-fa91-42e2-beff-18b6668804de')
				->set_required( true ),
		))
		->add_tab('Power Bill step', array(
			Field::make( 'text', 'crb_power_bill_step_question', 'Step Question')
				->set_default_value('What’s your average monthly power bill?')
				->set_required( true ),
			Field::make( 'text', 'crb_power_bill_left_card_title', 'Left Card Title')
				->set_default_value('100% Confidential')
				->set_required( true ),
			Field::make( 'textarea', 'crb_power_bill_left_card_text', 'Left Card Text')
				->set_default_value('Your information will be kept private and only used to determine what you qualify for.')
				->set_required( true ),
			Field::make( 'text', 'crb_power_bill_right_card_title', 'Right Card Title')
				->set_default_value('Why We Need This')
				->set_required( true ),
			Field::make( 'textarea', 'crb_power_bill_right_card_text', 'Right Card Text')
				->set_default_value('Your current energy costs usage help us determine how much you can save by going solar.')
				->set_required( true ),
		))
		->add_tab('Address step', array(
			Field::make( 'text', 'crb_address_step_question', 'Step Question')
				->set_default_value('What’s your property address?')
				->set_required( true ),
			Field::make( 'text', 'crb_address_left_card_title', 'Left Card Title')
				->set_default_value('For Verification Only.')
				->set_required( true ),
			Field::make( 'textarea', 'crb_address_left_card_text', 'Left Card Text')
				->set_default_value('We do not mail.')
				->set_required( true ),
			Field::make( 'text', 'crb_address_right_card_title', 'Right Card Title')
				->set_default_value('Why We Need This')
				->set_required( true ),
			Field::make( 'textarea', 'crb_address_right_card_text', 'Right Card Text')
				->set_default_value('We will use this information to find your home’s positioning to the sun.')
				->set_required( true ),
		))
		->add_tab('Home type step', array(
			Field::make( 'text', 'crb_home_type_step_question', 'Step Question')
				->set_default_value('What is your home type?')
				->set_required( true ),
			Field::make( 'complex', 'crb_home_type_options', 'Step options')
				->add_fields(array (
					Field::make( 'text', 'crb_home_type_option_text', 'Option text')
						->set_required( true ),
					Field::make( 'text', 'crb_home_type_option_value', 'Option value')
						->set_required( true ),
				)),
			Field::make( 'text', 'crb_home_type_left_card_title', 'Left Card Title')
				->set_default_value('Reduce Your Power Bill')
				->set_required( true ),
			Field::make( 'textarea', 'crb_home_type_left_card_text', 'Left Card Text')
				->set_default_value('Reduce your power bill and start saving day 1!')
				->set_required( true ),
			Field::make( 'text', 'crb_home_type_right_card_title', 'Right Card Title')
				->set_default_value('Earn Money with Your System')
				->set_required( true ),
			Field::make( 'textarea', 'crb_home_type_right_card_text', 'Right Card Text')
				->set_default_value('Run your meter backwards for credits with your utility!')
				->set_required( true ),
		))
		->add_tab('Roof shade step', array(
			Field::make( 'text', 'crb_roof_shade_step_question', 'Step Question')
				->set_default_value('How much roof shade do you get?')
				->set_required( true ),
			Field::make( 'complex', 'crb_roof_shade_options', 'Step options')
				->add_fields(array (
					Field::make( 'text', 'crb_roof_shade_option_text', 'Option text')
						->set_required( true ),
					Field::make( 'text', 'crb_roof_shade_option_value', 'Option value')
						->set_required( true ),
				)),
			Field::make( 'text', 'crb_roof_shade_left_card_title', 'Left Card Title')
				->set_default_value('Fast & Free')
				->set_required( true ),
			Field::make( 'textarea', 'crb_roof_shade_left_card_text', 'Left Card Text')
				->set_default_value('We never charge for our service, and we never will. Keep going, you’re almost at the finish line!')
				->set_required( true ),
			Field::make( 'text', 'crb_roof_shade_right_card_title', 'Right Card Title')
				->set_default_value('This Is Important')
				->set_required( true ),
			Field::make( 'textarea', 'crb_roof_shade_right_card_text', 'Right Card Text')
				->set_default_value('Trees shading a homeowner’s roof is common. But it’s best for the solar installer to know just how much shade we’re talking!')
				->set_required( true ),
		))
		->add_tab('Credit score step', array(
			Field::make( 'text', 'crb_credit_score_step_question', 'Step Question')
				->set_default_value('What is your credit score?')
				->set_required( true ),
			Field::make( 'complex', 'crb_credit_score_options', 'Step options')
				->add_fields(array (
					Field::make( 'text', 'crb_credit_score_option_text', 'Option text')
						->set_required( true ),
					Field::make( 'text', 'crb_credit_score_option_value', 'Option value')
						->set_required( true ),
				)),
			Field::make( 'text', 'crb_credit_score_left_card_title', 'Left Card Title')
				->set_default_value('Why we need this!')
				->set_required( true ),
			Field::make( 'textarea', 'crb_credit_score_left_card_text', 'Left Card Text')
				->set_default_value('Some of the programs require good credit.')
				->set_required( true ),
			Field::make( 'text', 'crb_credit_score_right_card_title', 'Right Card Title')
				->set_default_value('100% Confidential')
				->set_required( true ),
			Field::make( 'textarea', 'crb_credit_score_right_card_text', 'Right Card Text')
				->set_default_value('Your information will be kept private and only used to determine what you qualify for.')
				->set_required( true ),
		))
		->add_tab('Contact step', array(
			Field::make( 'text', 'crb_contact_step_question', 'Step Question')
				->set_default_value('Who is this savings report for?')
				->set_required( true ),
			Field::make( 'text', 'crb_contact_is_owner_caption', '"Is owner" input caption')
				->set_default_value('I am the owner and/or have authority with respect to this property.')
				->set_required( true ),
			Field::make( 'text', 'crb_contact_left_card_title', 'Left Card Title')
				->set_default_value('SSL Encryption')
				->set_required( true ),
			Field::make( 'textarea', 'crb_contact_left_card_text', 'Left Card Text')
				->set_default_value('We use the latest security technology to ensure that your info is 100% safe. Our customers are our #1 priority - always.')
				->set_required( true ),
			Field::make( 'text', 'crb_contact_right_card_title', 'Right Card Title')
				->set_default_value('We Never Spam')
				->set_required( true ),
			Field::make( 'textarea', 'crb_contact_right_card_text', 'Right Card Text')
				->set_default_value('No email lists with Calculatemysolarsavings. We respect your privacy, and will only connect you to matching solar installers.')
				->set_required( true ),
		))
		->add_tab('Email step', array(
			Field::make( 'text', 'crb_email_step_question', 'Step Question')
				->set_default_value('Where should we email your savings report?')
				->set_required( true ),
			Field::make( 'text', 'crb_email_email_me', '"Email me" input caption')
				->set_default_value('Email me a link to my report')
				->set_required( true ),
			Field::make( 'text', 'crb_email_left_card_title', 'Left Card Title')
				->set_default_value('We take privacy seriously.')
				->set_required( true ),
			Field::make( 'textarea', 'crb_email_left_card_text', 'Left Card Text')
				->set_default_value('No Spam whatsoever!')
				->set_required( true ),
			Field::make( 'text', 'crb_email_right_card_title', 'Right Card Title')
				->set_default_value('100% Confidential')
				->set_required( true ),
			Field::make( 'textarea', 'crb_email_right_card_text', 'Right Card Text')
				->set_default_value('Your information will be kept private and only used to determine what you qualify for.')
				->set_required( true ),
		))
		->add_tab('Phone number step', array(
			Field::make( 'rich_text', 'crb_phone_number_step_title', 'Step title')
				->set_default_value('<span class="main-title_p2">Your Report Is Ready!</span> See If You Qualify For Solar Incentives')
				->set_required( true ),
			Field::make( 'text', 'crb_phone_number_step_msg', 'Step message')
				->set_default_value('Please complete this last step to view your savings.')
				->set_required( true ),
			Field::make( 'rich_text', 'crb_phone_number_privacy_policy', 'Privacy policy')
				->set_default_value('By clicking the submit button, you hereby agree to the
					<a href="#" class="step-page__agreement-link" data-link="privacy-policy">Privacy Policy</a> and
					<a href="#" class="step-page__agreement-link" data-link="terms-and-conditions">Terms & Conditions</a>. You also hereby consent to receive marketing
					communications via automated telephone dialing system and/or pre-recorded calls, text messages, and/or emails from
					our <a href="#" class="step-page__agreement-link">Service Providers and Partners</a> at the phone number, physical
					address and email address provided above, even if you are on any State and/or Federal Do Not Call list.
					Consent is not a condition of purchase and may be revoked at any time. Message and data rates may apply.
					<a href="#" class="step-page__agreement-link">California Residents.</a>')
				->set_required( true ),
			Field::make( 'text', 'crb_phone_number_left_card_title', 'Left Card Title')
				->set_default_value('We take privacy seriously.')
				->set_required( true ),
			Field::make( 'textarea', 'crb_phone_number_left_card_text', 'Left Card Text')
				->set_default_value('No Spam whatsoever!')
				->set_required( true ),
			Field::make( 'text', 'crb_phone_number_right_card_title', '100% Confidential')
				->set_default_value('100% Confidential')
				->set_required( true ),
			Field::make( 'textarea', 'crb_phone_number_right_card_text', 'Right Card Text')
				->set_default_value('Your information will be kept private and only used to determine what you qualify for.')
				->set_required( true ),
		))
		->add_tab('Booking step', array(
			Field::make( 'rich_text', 'crb_booking_step_title', 'Step title')
				->set_default_value('Congrats {{firstName}}!')
				->set_required( true ),
			Field::make( 'rich_text', 'crb_booking_step_heading_text', 'Heading step text (before calculator)')
				->set_default_value('You’ve been approved to get solar for no upfront cost.')
				->set_required( true ),
			Field::make( 'rich_text', 'crb_booking_step_calculator_text', 'Calculator text template')
				->set_default_value('Based upon your average bill of ' .
				'<span class="savings-calculator__text_accent-v1">{{avaragePowerBill}}$</span>, ' .
				'your estimated savings over ' .
				'<span class="savings-calculator__text_accent-v1">{{yearsNumber}}</span> {{yearsLabel}} ' .
				'by switching to solar is between ' .
				'<span class="savings-calculator__text_accent-v2">{{savings25}}$</span> ' .
				'and <span class="savings-calculator__text_accent-v2">{{savings50}}$</span>.')
				->set_required( true ),
			Field::make( 'rich_text', 'crb_booking_step_text', 'Step text')
				->set_default_value('<p>Grab a spot on our calendar below to get an exact estimate of your savings and to find out how much cash back you’ll receive from government incentives by making the switch.</p><p><span class="booking-step__text_p2">You’ll like our energy advisors,they’re friendly!</span>If they aren’t,let us know and we’ll punish them.</p>')
				->set_required( true ),
		))
		->add_tab('Thank you step', array(
			Field::make( 'text', 'crb_summary_title', 'Step title')
				->set_default_value('{{firstName}} your consultation is booked!')
				->set_required( true ),
			Field::make( 'text', 'crb_summary_text', 'Step text')
				->set_default_value('Here’s how to prepare for your call:')
				->set_required( true ),
			Field::make( 'text', 'crb_summary_add_to_calendar_section_title', '"Add to calendar" section title')
				->set_default_value('Add to Your Calendar')
				->set_required( true ),
			Field::make( 'text', 'crb_summary_power_bill_section_title', '"Power bill upload" section title')
				->set_default_value('Most Recent Electric Bill')
				->set_required( true ),
			Field::make( 'textarea', 'crb_summary_power_bill_section_text', '"Power bill upload" section text')
				->set_default_value('To accurately design your energy system, please upload a recent electric utility bill. The bill will include the account holder’s name, home service address, 12 months of usage or total annual usage, and your meter number.')
				->set_required( true ),
			Field::make( 'text', 'crb_summary_credit_check_section_title', '"Credit check" section title')
				->set_default_value('Free Credit Check')
				->set_required( true ),
			Field::make( 'textarea', 'crb_summary_credit_check_section_text', '"Credit check" section text')
				->set_default_value('To accurately design your energy system, please upload a recent electric utility bill. The bill will include the account holder’s name, home service address, 12 months of usage or total annual usage, and your meter number.')
				->set_required( true ),
			Field::make( 'text', 'crb_summary_credit_check_link', '"Credit check" link')
				->set_default_value('https://www.creditkarma.com/')
				->set_required( true ),
			Field::make( 'text', 'crb_summary_refer_friend_section_title', '"Refer friend" section title')
				->set_default_value('Free Credit Check')
				->set_required( true ),
			Field::make( 'textarea', 'crb_summary_refer_friend_section_text', '"Refer friend" section text')
				->set_default_value('Earn $500 for every solar installation you refer and more as your network grows!')
				->set_required( true ),
			Field::make( 'text', 'crb_summary_video_section_title', '"Video" section title')
				->set_default_value('See Why Millions Have Switched To Solar')
				->set_required( true ),
			Field::make( 'text', 'crb_summary_video_integration_code', 'Wistia media ID')
				->set_default_value('s3lqfi0zn7')
				->set_required( true ),
			Field::make( 'text', 'crb_summary_faq_section_title', '"FAQ" section title')
				->set_default_value('Frequently Asked Questions')
				->set_required( true ),
			Field::make( 'complex', 'crb_faq_items', 'FAQ records')
				->add_fields( array(
					Field::make( 'text', 'crb_faq_item_title', 'Title')
					->set_required( true ),
					Field::make( 'textarea', 'crb_faq_item_text', 'Text')
					->set_required( true ),
				) ),
		))
		->add_tab('Bad summary step', array(
			Field::make( 'text', 'crb_bad_summary_title', 'Step title')
				->set_default_value('Oh No, {{firstName}}')
				->set_required( true ),
			Field::make( 'rich_text', 'crb_bad_summary_text', 'Step text')
				->set_default_value("<p>You don't yet qualify for our no upfront cost solar program</p><p>In order to qualify, you need to both own a home, and have a credit score above 600</p>")
				->set_required( true ),
			Field::make( 'text', 'crb_bad_summary_refer_friend_section_title', '"Refer friend" section title')
				->set_default_value('Free Credit Check')
				->set_required( true ),
			Field::make( 'textarea', 'crb_bad_summary_refer_friend_section_text', '"Refer friend" section text')
				->set_default_value('Earn $500 for every solar installation you refer and more as your network grows!')
				->set_required( true ),
			Field::make( 'text', 'crb_bad_summary_credit_repair_section_title', '"Credit repair" section title')
				->set_default_value('Start Repairing Your Credit')
				->set_required( true ),
			Field::make( 'textarea', 'crb_bad_summary_credit_repair_section_text', '"Credit repair" section text')
				->set_default_value('If your credit is to low, now is a great time to start building it. Our partners are experts at helping tou build your credit. Tap the button below to start building yours.')
				->set_required( true ),
			Field::make( 'text', 'crb_bad_summary_credit_repair_link', '"Credit repair" link')
				->set_default_value('https://www.creditkarma.com/')
				->set_required( true ),
		))
		->add_tab('Processing steps', array(
			Field::make( 'text', 'crb_processing_step_checking_rebates_msg', '"Checking" message')
				->set_default_value('Checking Local Rebates & Incentives')
				->set_required( true ),
			Field::make( 'text', 'crb_processing_step_contact_processing_msg', '"Contact processing" message')
				->set_default_value('Processing your information')
				->set_required( true ),
			Field::make( 'text', 'crb_processing_step_booking_processing_msg', '"Booking processing" message')
				->set_default_value('Processing your consultation request')
				->set_required( true ),
		))
?>