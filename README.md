
# WordPress Theme Generator

## Features

This generator is based on the (CDD Generator)[https://github.com/bnhovde/generator-fed-up].

The idea behind this structure, was to allow the project to have both a distribution and development version of the theme whilst enabling deployment with GIT. This method also means the GIT repo does not sit within the plugins directory of WordPress which would stop you deploying an additional theme in the same way.


## Installation

Set up the directory (or just move to it).

```
cd /the/generator/dir # make it if you need
```

Clone the repo to this folder.

```
git clone https://github.com/danny-allen/generator-wp-theme .
```

Install the generator.

```
npm install -g generator-wp-theme
```

Link the package, to use it globally.

```
npm link
```

## Usage

So, you've set up the generator. Now all you need to do is run it. Create a folder to store the theme:

```mkdir /path/to/theme```

Now when you create a theme in your WordPress installation you can symlink to this project folder. This this:


```
ls -s /path/to/theme /path/to/wordpress/wp-content/plugins/themename/app
```

Swap `app` to `dist` on production (this can be created with the `gulp` command inside the project folder).

## License

MIT
