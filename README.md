# SoundCloud Mute Manager

[![GitHub release](https://img.shields.io/github/release/nullgato/sc-mute-manager?include_prereleases=&sort=semver&color=blue)](https://github.com/nullgato/sc-mute-manager/releases/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

This project is just a basic userscript that adds a "MUTE" button next to commenters. This can be used by followers who just plain don't want to see another commenter or it can be used by the artist who don't want to see an annoying/mean commenter but want the engagement for the analytics.

This only hides it for **you** and nobody else.

It does not currently have functionality to remove users from the mute list, so be careful.

## Installation

The first step is installing a browser extension that allows userscripts. Userscripts are files that can be used alongside a website's existing files to run code that the site doesn't have. I use [Violentmonkey](https://violentmonkey.github.io/get-it/) for no other reason than it was how I was introduced to userscripts..

After you do that you can click the image underneath this line of text to install straight from GitHub!

[current-release]: https://github.com/nullgato/sc-mute-manager/releases/latest/download/sc-mute-manager.user.js

[![Install - Via Github](https://img.shields.io/badge/Install-Via_Github-2ea44f?style=for-the-badge&logo=tampermonkey)][current-release]

<small>\* SoundCloud Mute Manager officially supports Chrome, Edge, and Firefox, but has also been tested with Arc (1.30.0) and Opera GX (105). Other browsers may work if they have a userscript extension.</small>

## Development

### Requirements

-   Supported Browser with [Violentmonkey](https://violentmonkey.github.io/get-it/) (Chrome and Firefox have the best dev experience)

### Setup

-   Clone this project or download the source code .zip in Releases
-   Open a terminal window and point it the sc-mute-manager folder
    -   `cd <file path to folder>`
-   Open the file and edit away using your favorite terminal editor, or just open the file in a graphical editor like VS Code

### Usage

In order to load this script into Violentmonkey, you will locate the `sc-mute-manager.user.js` file and drag the file into the browser tabs area of Chrome or \*Firefox. The Violentmonkey extension should automatically detect this and prompt you to take action on the userscript in a new tab. Within this tab, you'll want to click the `Track external edits` button. The checkbox directly to the right of this button will make this tracking automatically when you do this process in the future. Keep this tab open.

If you browse to a track on SoundCloud, you should now be able to see the changes affected by the project.

<small>\*Firefox requires the sc-mute-manager.user.js file to remain open <strong>with</strong> the extension tab.</small>

## License

Released under [MIT](/LICENSE) by [@nullgato](https://github.com/nullgato).

## Acknowledgments

SoundCloud Mute Manager uses open-source libraries and dependencies to provide its functionality:

-   [Violentmonkey](https://violentmonkey.github.io/): For their guide and API.
