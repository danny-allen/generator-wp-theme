
# WordPress Theme Generator

## Features

This generator is based on the [CDD Generator](https://github.com/bnhovde/generator-fed-up).

The idea behind this structure, was to allow the project to have both a distribution and development version of the theme whilst enabling deployment with GIT. This method also means the GIT repo does not sit within the themes directory of WordPress which would stop you deploying an additional theme in the same way.


## Installation

Set up the directory for the generator, move to it, and clone the repo.

```sh
git clone https://github.com/danny-allen/generator-wp-theme .
```

Install the generator.

```sh
npm install -g generator-wp-theme
```

Link the package, to use it globally.

```sh
npm link
```

## Usage

So, you've set up the generator. Now all you need to do is run it. Create a folder to store the theme:

```sh
mkdir /path/to/theme
```

This command will run the generator. Just answer all the questions and let Yeoman do it's thing!

```sh
yo wp-theme
```

You now have your theme which should exists somewhere outside of the WordPress installtion. Now go to the themes folder (wp-content/themes) and create a symlink to your theme folder, like this:

```sh
ln -s /path/to/your-theme/app theme-name
```

Swap `app` to `dist` on production (this can be created with the `gulp` command inside the project folder).

## License

MIT
