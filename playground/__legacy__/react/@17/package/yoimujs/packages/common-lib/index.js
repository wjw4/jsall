/// <reference path="./type.d.ts" />
import { createEnum } from './src/create-enum'
import { declareEnum } from './src/declare-enum'
import { stepPrice } from './src/step-price'
import {
	checkIncludeText,
	checkSameChinese,
	toSimple,
	toTraditional,
} from './src/cn-translate'
import mtime from './src/mtime'
import { timeout } from './src/timer/timeout'
import { interval } from './src/timer/interval'
import { aniFrame } from './src/timer/ani-frame'
import { generateId } from './src/generateId'
import { mergeWords } from './src/merge-words'
import { findNestedDynamicObj } from './src/find-nested-dynamic-obj'

export {
	createEnum,
	declareEnum,
	stepPrice,
	toSimple,
	toTraditional,
	checkSameChinese,
	checkIncludeText,
	mtime,
	timeout,
	interval,
	aniFrame,
	generateId,
	mergeWords,
	findNestedDynamicObj,
}
