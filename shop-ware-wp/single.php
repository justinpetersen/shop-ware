<?php get_header(); ?>
<div class="col-xs-12 col-sm-6 col-md-8 news-content">
<div class="orange-bar hidden-xs">&nbsp;</div>
<section id="content" role="main">
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<?php get_template_part( 'entry' ); ?>
<?php if ( ! post_password_required() ) comments_template( '', true ); ?>
<?php endwhile; endif; ?>
<footer class="footer">
<?php get_template_part( 'nav', 'below-single' ); ?>
</footer>
</section>
</div>
<?php get_sidebar(); ?>
<?php get_footer(); ?>