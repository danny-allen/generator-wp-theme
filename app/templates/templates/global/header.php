<header class="header" role="banner">
	<div class="header__inner">
		<div class="logo">
			<a href="/"><img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="<%= appName %>" /></a>
		</div>
		<nav class="nav" role="navigation">
			<?php <%= _.slugify(appMachineName) %>_nav(); ?>
		</nav>
	</div>
</header>
