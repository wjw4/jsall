import fs from 'node:fs'
import path from 'node:path'

export async function checkMkdirBuildFolderAndGitIgnore(packageName: string) {
	const buildPath = getBuildPath(packageName)

	try {
		await fs.promises.access(buildPath)
	} catch {
		await fs.promises.mkdir(buildPath, { recursive: true })
	} finally {
		const gitIgnorePath = path.resolve(getBuildPath(packageName), './.gitignore')

		try {
			await fs.promises.access(gitIgnorePath)
		} catch {
			await fs.promises.writeFile(gitIgnorePath, '*')
		}
	}
}

export function getBuildPath(packageName: string) {
	return path.resolve(process.cwd(), `node_modules/${packageName}/.vb`)
}