#!/usr/bin/env node
const { resolve, basename } = require('path')
const cli = require('commander')
const DMP = require('diff-match-patch')
const { fs } = require('mz')

const pkg = require('./package.json')
const { generatePatch, patchFile, checkPatchValid } = require('./rnbp')

cli
  .version(pkg.version)
  .command('generate <bundle-prev> <bundle-next>')
  .alias('g')
  .usage('generate a patch file from two bundle file')
  .option('-o, --output', 'Patch file name')
  .action(generatePatch)

cli
  .command('patch <bundle-to-patch> <patch-file>')
  .alias('p')
  .usage('patch a bundle file with a given patch file')
  .option('-r, --replace', 'Replace bundle file')
  .action(patchFile)

cli
  .command('check-valid <path-to-patchfile>')
  .alias('c')
  .usage('check whether a patchFile is valid')
  .action(checkPatchValid)

cli.parse(process.argv)

process.on('unhandledRejection', (e) => {
  console.error(e.message)
  process.exit(1)
})
