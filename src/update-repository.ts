import {getDiffs, commitAsAction, push} from './git-utilities'
import {IGitSourceSettings} from './external/git-source-settings'
import {info} from '@actions/core'
import {join} from 'path'
import {ExecOptionsStub} from './exec-options-stub'

export async function updateRepository(
  badgesDirectory: string,
  settings: IGitSourceSettings
): Promise<void> {
  info(`Working directory is '${settings.repositoryPath}'`)
  const badgeDir = join(settings.repositoryPath, badgesDirectory)
  const stub2 = new ExecOptionsStub()
  const exitCode = await getDiffs(badgeDir, stub2.options)
  info(`Diff stdout: ${stub2.stdout}`)
  info(`Diff stder: ${stub2.stderr}`)
  if (exitCode === 0) {
    const matches = (stub2.stdout.match(/\.svg/g) || []).length
    // eslint-disable-next-line no-console
    console.log(`SVG matches: ${matches}`)
    if (matches > 0) {
      const commitStub = new ExecOptionsStub()
      await commitAsAction(badgesDirectory, commitStub.options)
      await push(commitStub.options)
    }
  }
}
