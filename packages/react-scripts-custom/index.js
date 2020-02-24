#!/usr/bin/env node

const pkg = require('./package.json')
const abbreviate = require('abbreviate')

const cliName = abbreviate(pkg.name, { length: 3 })

require('react-ryo-cli').spawnCli({
  signature: cliName,
  signatureTheme: 'vice'
})
