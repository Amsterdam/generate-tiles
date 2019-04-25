#!/usr/bin/env node

const fs = require('fs')
const util  = require('util')
const spawn = require('child_process').spawn
const yaml = require('js-yaml')
const argv = require('yargs')
  .option('srs', {
    alias: 's',
    describe: 'Tile projection',
    default: 28992,
    choices: [4326, 28992]
  })
  .option('map', {
    alias: 'm',
    describe: 'MapServer map (name of .map file)'
  })
  .option('layer', {
    alias: 'l',
    describe: 'WMS layer'
  })
  .option('bounds', {
    alias: 'b',
    describe: 'Comma-separated bounding box'
    // TODO: check if param contains 4 numbers
  })
  .option('levels', {
    alias: 'e',
    describe: 'min. and max. level of tiles, seperated by a dash (-)',
    default: '5-16'
    // TODO: check if param contains -
  })
  .demandOption(['srs', 'map', 'layer'])
.argv

const bounds4326 = [4.72876, 52.2782, 5.07916, 52.4311]
const bounds28992 = [110099, 477249, 128100, 492251]

const srcMapProxyYaml = '/app/mapproxy.yaml'
const srcSeedYaml = '/app/seed.yaml'

const dstMapProxyYaml = '/tmp/mapproxy.yaml'
const dstSeedYaml = '/tmp/seed.yaml'

const mapProxyData = yaml.safeLoad(fs.readFileSync(srcMapProxyYaml, 'utf8'))
const seedData = yaml.safeLoad(fs.readFileSync(srcSeedYaml, 'utf8'))

fs.writeFileSync(dstMapProxyYaml, yaml.safeDump({...mapProxyData, ...{
  sources: {
    source: {
      type: 'wms',
      req: {
        url: `http://mapserver/maps/${argv.map}`,
        layers: argv.layer,
        transparent: true
      }
    }
  }
}}), 'utf8')

const levels = argv.levels
  .split('-')
  .map((level) => parseInt(level))

let bbox
if (argv.bounds) {
  bbox = argv.bounds
    .split(',')
    .map((coordinate) => parseFloat(coordinate))
} else {
  bbox = argv.srs === 28992 ? bounds28992 : bounds4326
}

fs.writeFileSync(dstSeedYaml, yaml.safeDump({...seedData, ...{
  seeds: {
    seed: {
      caches: [`cache_${argv.srs}`],
      grids: [`grid_${argv.srs}`],
      coverages: ['coverage'],
      levels: {
        from: levels[0],
        to: levels[1]
      },
      refresh_before: {
        minutes: 1
      }
    }
  },
  coverages: {
    coverage: {
      bbox,
      srs: `EPSG:${argv.srs}`
    }
  }
}}), 'utf8')

const spawned = spawn('mapproxy-seed', [
  '-c',
  '1',
  '-s',
  '/tmp/seed.yaml',
  '-f',
  '/tmp/mapproxy.yaml',
  '--seed=seed'
])

spawned.stdout.on('data', (data) => process.stdout.write(data))
spawned.stderr.on('data', (data) => process.stderr.write(data))
spawned.on('exit', (code) => console.log(`Done, with exit code ${code}`))
