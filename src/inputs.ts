import * as core from '@actions/core'
import {parseArray} from './parse-array'
import {getInputs} from './external/input-helper'
import {IGitSourceSettings} from './external/git-source-settings'

export class Inputs {
  readonly coverageSummaryPath: string
  readonly badgesDirectory: string
  readonly protectedBranches: string[]
  readonly writeDebugLogs: boolean
  readonly gitSourceSettings?: IGitSourceSettings
  readonly githubWorkspace: string = ''
  readonly actor: string = ''
  readonly repository: string = ''

  constructor() {
    const prodRun =
      core.getInput('angular-coverage-badges-ci-run') === 'true' ? false : true

    if (prodRun) {
      this.gitSourceSettings = getInputs()
    }
    this.coverageSummaryPath = core.getInput('coverage-summary-path')
    this.badgesDirectory = core.getInput('badges-directory')
    const branches = core.getInput('protected-branches')
    this.protectedBranches = parseArray(branches)
    this.writeDebugLogs =
      core.getInput('write-debug-logs') === 'true' ? true : false
    if (process.env['GITHUB_WORKSPACE']) {
      this.githubWorkspace = process.env['GITHUB_WORKSPACE']
    }
    if (process.env['GITHUB_ACTOR']) {
      this.actor = process.env['GITHUB_ACTOR']
    }
    if (process.env['GITHUB_REPOSITORY']) {
      this.repository = process.env['GITHUB_REPOSITORY']
    }
  }
}
