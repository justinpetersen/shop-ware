<?php

function remove_blankslate_filter_wp_title() {
	remove_filter('wp_title', 'blankslate_filter_wp_title');
}

add_action('init', 'remove_blankslate_filter_wp_title');

add_filter('wp_title', 'shopware_filter_wp_title');

function shopware_filter_wp_title($title)
{
	return esc_attr(get_bloginfo('name')) . $title;
}