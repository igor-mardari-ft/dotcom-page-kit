import babelPreset from './babel'
import { HandlerArgs } from '@financial-times/anvil'

export function plugin() {
  return ({ on }) => {
    on('babelConfig', amendBabelConfig)
  }
}

function amendBabelConfig({ cli, resource: babelConfig }: HandlerArgs) {
  babelConfig.presets.push(babelPreset(cli))
}
