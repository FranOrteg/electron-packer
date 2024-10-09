# electron-packer

Package your [Electron](https://electronjs.org) app into OS-specific bundles (`.app`, `.exe`, etc.) via JavaScript or the command line.

[![CircleCI Build Status](https://circleci.com/gh/electron/packager/tree/main.svg?style=svg)](https://circleci.com/gh/electron/packager/tree/main)
[![electron-nightly Canary](https://github.com/electron/packager/actions/workflows/canary.yml/badge.svg)](https://github.com/electron/packager/actions/workflows/canary.yml)
[![Coverage Status](https://codecov.io/gh/electron/packager/branch/main/graph/badge.svg)](https://codecov.io/gh/electron/packager)
[![npm](https://img.shields.io/npm/v/@electron/packager.svg?style=flat)](https://npm.im/@electron/packager)
[![Discord](https://img.shields.io/discord/745037351163527189?color=blueviolet&logo=discord)](https://discord.com/invite/APGC3k5yaH)

[Supported Platforms](#supported-platforms) |
[Installation](#installation) |
[Usage](#usage) |
[API](https://electron.github.io/packager/main/) |
[Contributing](https://github.com/electron/packager/blob/main/CONTRIBUTING.md) |
[Support](https://github.com/electron/packager/blob/main/SUPPORT.md) |
[Related Apps/Libraries](#related) |
[FAQ](https://github.com/electron/packager/blob/main/docs/faq.md) |
[Release Notes](https://github.com/electron/packager/blob/main/NEWS.md)

----

## About

Electron Packager is a command line tool and Node.js library that bundles Electron-based application
source code with a renamed Electron executable and supporting files into folders ready for distribution.

For creating distributables like installers and Linux packages, consider using either [Electron
Forge](https://github.com/electron/forge) (which uses Electron Packager
internally), or one of the [related Electron tools](#distributable-creators), which utilizes
Electron Packager-created folders as a basis.

Note that packaged Electron applications can be relatively large. A zipped, minimal Electron
application is approximately the same size as the zipped prebuilt binary for a given target
platform, target arch, and [Electron version](https://github.com/electron/electron/releases)
_(files named `electron-v${version}-${platform}-${arch}.zip`)_.

## Supported Platforms

Electron Packager is known to run on the following **host** platforms:

* Windows (32/64 bit)
* macOS (formerly known as OS X)
* Linux (x86/x86_64)

It generates executables/bundles for the following **target** platforms:

* Windows (also known as `win32`, for x86, x86_64, and arm64 architectures)
* macOS (also known as `darwin`) / [Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide/) (also known as `mas`)<sup>*</sup> (for x86_64, arm64, and universal architectures)
* Linux (for x86, x86_64, armv7l, arm64, and mips64el architectures)

<sup>*</sup> *Note for macOS / Mac App Store target bundles: the `.app` bundle can only be signed when building on a host macOS platform.*

## Installation

This module requires Node.js 16.13.0 or higher to run.

```sh
npm install --save-dev @electron/packager
```

It is **not** recommended to install `@electron/packager` globally.


<img align="center" src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjRzamt3N21jd3UyeDU3OXE3aDQ4NTdraXU2ZWF2azk0ODN2MmRzNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wwg1suUiTbCY8H8vIA/giphy-downsized-large.gif" width="385px">