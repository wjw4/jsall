import { exec } from 'node:child_process'
import cac from 'cac'
import dayjs from 'dayjs'

const cliOptions = [
  {
    cmd: '--name <string>',
    desc: '運行的腳本名：new 創建艾賓浩斯時間, add 現有時間增加?天',
    defaultValue: 'new' as 'new' | 'add',
  } as const,
  {
    cmd: '--val <string>',
    desc: '運行的腳本用到的值：add 增加的天數們(like: 1)',
    defaultValue: null as any,
  } as const,
  {
    cmd: '--val2 <string>',
    desc: '運行的腳本用到的值：add 增加的天數們(like: 20240130 20240131)',
    defaultValue: null as any,
  } as const,
] as const
type CliOptions = typeof cliOptions
const { options } = bootstrapCac<
  ParsedOption<CliOptions[0]> & ParsedOption<CliOptions[1]> & ParsedOption<CliOptions[2]>
>({
  options: cliOptions,
})
const { name: commandName } = options
const commandValues = [options.val, options.val2]
const rangeDays = [1, 2, 4, 7, 15, 30]

if (commandName === 'new') {
  createDates()
} else if (commandName === 'add') {
  plusDates(...commandValues)
}

function createDates () {
  const result = rangeDays.map(e => dayjs().add(e, 'day').format('YYYYMMDD')).join(' ')
  console.log('最終結果')
  console.log(result)
  copyText(result, () => console.log('結果已複製'))
}

function plusDates (addDay?: number, date?: string) {
  console.log(addDay, date)
  if (!addDay) throw '請輸入增加的天數'
  if (!date) throw '請輸入天數們'

  const result = date.split(/\s+/).map(e => dayjs(e, 'YYYYMMDD').add(addDay, 'day').format('YYYYMMDD')).join(' ')
  console.log('最終結果')
  console.log(result)
  copyText(result, () => console.log('結果已複製'))
}

function copyText (text: string, callback?: () => void) {
  exec(`echo ${text} | clip`, err => {
    if (!err) callback?.()
  })
}

type CliOption = {
  cmd: string
  desc: string
  defaultValue: any
}

type FirstUppercase<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : S

type OptionName<
  Name extends string,
  Res extends string = '',
> = Name extends `${infer V}-${infer R}`
  ? OptionName<R, `${Res}${Res extends '' ? V : FirstUppercase<V>}`>
  : Res extends ''
    ? Name
    : `${Res}${FirstUppercase<Name>}`

type ParsedOption<Opt extends CliOption> = Opt extends {
    cmd: infer Cmd
    defaultValue: infer ValType
  }
  ? Cmd extends `--${infer Name} ${infer R}`
    ? Record<OptionName<Name>, ValType | undefined>
    : Cmd extends `--${infer Name}`
      ? Record<OptionName<Name>, ValType | undefined>
      : never
  : never

type ParsedArgv<Opts = { [key: string]: any }> = {
  args: ReadonlyArray<string>
  options: Opts
}

function bootstrapCac<Opts>({
                              options,
                            }: {
  options: ReadonlyArray<CliOption>
}): ParsedArgv<Opts> {
  const cli = cac()
  for (let i = 0; i < options.length; i++) {
    const { cmd, desc, defaultValue } = options[i]
    cli.option(cmd, desc, defaultValue ? { default: defaultValue } : undefined)
  }
  cli.help()
  return cli.parse() as ParsedArgv<Opts>
}
