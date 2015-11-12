<?php get_header(); ?>

	<main role="main">
		<!-- section -->
		<section>

			<h1><?php _e( 'Latest Posts', '<%= _.slugify(appMachineName) %>' ); ?></h1>

			<?php get_template_part('templates/loop'); ?>

			<?php get_template_part('templates/pagination'); ?>

		</section>
		<!-- /section -->
	</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
