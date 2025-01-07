import process from "node:process";
import {EOL} from "node:os";
import ansiEscapes from "ansi-escapes";
import stringWidth from "string-width";
import chalk from "chalk";

export class ProgressBar {
  /** @desc 最大字元 */
  static MAX_COLUMNS = 100
  private static _write = process.stdout.write.bind(process.stdout)
  private readonly _format: string
  private readonly _includesBar: boolean
  private readonly _hideCursor: boolean
  private readonly _barCompleteChar: string
  private readonly _barIncompleteChar: string
  private readonly _barCompleteColorHex: string | undefined
  private readonly _barIncompleteColorHex: string | undefined
  private _current = 0;
  private _total = 100;
  private _terminalWidth = process.stdout.columns

  constructor(
    {
      format = '{bar} {percent}% {current}/{total}',
      hideCursor,
      barCompleteChar = '\u2588',
      barIncompleteChar = '\u2591',
      barCompleteColorHex,
      barIncompleteColorHex,
    }: {
      format?: string
      hideCursor?: boolean
      barCompleteChar?: string
      barIncompleteChar?: string
      barCompleteColorHex?: string
      barIncompleteColorHex?: string
    } = {}
  ) {
    this._format = format.trim()
    this._hideCursor = !!hideCursor
    this._includesBar = format.includes('{bar}')
    this._barCompleteChar = barCompleteChar
    this._barIncompleteChar = barIncompleteChar
    this._barCompleteColorHex = barCompleteColorHex
    this._barIncompleteColorHex = barIncompleteColorHex
  }

  private _calcWidth() {
    /** @desc 當前終端寬度為 n 字元 */
    const terminalWidth = process.stdout.columns
    if (terminalWidth > ProgressBar.MAX_COLUMNS) {
      this._terminalWidth = ProgressBar.MAX_COLUMNS
    } else {
      this._terminalWidth = terminalWidth
    }
  }

  start(total: number, current = 0) {
    this._current = current
    this._total = total
    this._calcWidth()
    if (this._hideCursor) ProgressBar._write(ansiEscapes.cursorHide)
    ProgressBar._write(ansiEscapes.cursorSavePosition)
    this._render()
  }

  stop() {
    ProgressBar._write(EOL)
  }

  getTotal() {
    return this._total
  }

  update(current: number) {
    this._current = current
    this._render()
  }

  private _render() {
    let rate = this._current / this._total

    if (rate < 0) {
      rate = 0
    } else if (rate > 1) {
      rate = 1
    }

    const percent = Math.floor(rate * 100)
    let progressText = this._format.replace(/(\{percent}|\{current}|\{total})/g, (matchText) => {
      if (matchText === '{percent}') return percent.toString()
      if (matchText === '{current}') return this._current.toString()
      if (matchText === '{total}') return this._total.toString()
      return matchText
    })

    ProgressBar._write(ansiEscapes.cursorRestorePosition)
    if (this._includesBar) {
      const textColumns = stringWidth(progressText) - 5 /*5為{bar}長度*/
      let barColumns = this._terminalWidth - textColumns

      if (barColumns <= 10) {
        barColumns = 10
      }

      const completeColumns = Math.floor(barColumns * rate)
      const incompleteColumns = barColumns - completeColumns
      const completeBarText = this._barCompleteChar.repeat(completeColumns)
      const completeBar = this._barCompleteColorHex ? chalk.hex(this._barCompleteColorHex).bold(completeBarText) : completeBarText
      const incompleteBarText = this._barIncompleteChar.repeat(incompleteColumns)
      const incompleteBar = this._barIncompleteColorHex ? chalk.hex(this._barIncompleteColorHex).bold(incompleteBarText) : incompleteBarText
      progressText = progressText.replace('{bar}', `${completeBar}${incompleteBar}`)
    }
    ProgressBar._write(progressText)

    if (percent === 100) {
      this.stop()
    }
  }
}