import { expect, test } from 'vitest'
import { pickerShortcut } from './shortcuts.js'

const press = (key: string, code: string) =>
	pickerShortcut(new KeyboardEvent('keydown', { key, code, shiftKey: true }))

test('Shift+M and Shift+Y open the lists', () => {
	expect(press('M', 'KeyM')).toBe('monthList')
	expect(press('Y', 'KeyY')).toBe('yearList')
})

test('a layout without Latin letters falls back to the key position', () => {
	expect(press('Ь', 'KeyM')).toBe('monthList')
	expect(press('Н', 'KeyY')).toBe('yearList')
})

test('a symbol on the M or Y key is typing, not a shortcut', () => {
	expect(press('?', 'KeyM')).toBeUndefined()
	expect(press('!', 'KeyY')).toBeUndefined()
})
