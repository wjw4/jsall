import ts from 'typescript'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

function tsCompile(source: string): string {
	return ts.transpileModule(source, {
		compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ESNext },
	}).outputText
}

export async function importDynamicTs<T = any>(filepath: string): Promise<T> {
	const jsFilename = `idt-${Date.now()}.js`
	const jsFilepath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), jsFilename)
	const jsText = tsCompile(await fs.readFileSync(filepath, 'utf-8'))
	const jsImportPath = `./${jsFilename}`

	await fs.promises.writeFile(jsFilepath, jsText)
	let result: T
	try {
		result = (await import(jsImportPath)) as T
	} catch (error) {
		result = error as T
	} finally {
		await fs.promises.rm(jsFilepath)
	}

	return result
}
