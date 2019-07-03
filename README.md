# react-native-bundle-diff-match-patch

CLI tool to generate patch, apply patch, valid patch

## Install

```bash
$ yarn global add react-native-bundle-diff-match-patch

//or

$ npm install -g react-native-bundle-diff-match-patch
```

## Usage

### generate patch file

```bash
$ rnbp generate old-bundle-path new-bundle-path -o patch-file-name
```

### apply patch file

```bash
$ rnbp patch old-bundle-path patch-file-name
// this will generate a new file with a postfix .patched


$ rnbp patch old-bundle-path patch-file-name -r
// this will replace the old bundle file
```

### check patch file is valid

```bash
$ rnbp check-valid patch-file-name
```
