<div class="accordion">
<?php
	$faq_items = carbon_get_theme_option('crb_faq_items');
	foreach ($faq_items as $faq_item) {
		echo '<div class="accordion__item"><div class="accordion__item-header"><h3 class="accordion__item-title">';
		echo $faq_item['crb_faq_item_title'];
		echo '</h3><div class="accordion__item-header-icon"></div></div><div class="accordion__item-body">';
		echo $faq_item['crb_faq_item_text'];
		echo '</div></div>';
	};
?>
</div>

