/* src/lib/availability.test.ts
 * MIT Licence — (c) Free Names
 */

import { expect, test } from 'bun:test';
import { isReserved, isValidName, normaliseName, splitHostname } from './availability';

test('normaliseName lowercases and dashes spaces', () => {
	expect(normaliseName('  My Cool  Site ')).toBe('my-cool-site');
});

test('isValidName accepts plain and nested names', () => {
	expect(isValidName('clove')).toBe(true);
	expect(isValidName('_discord.clove')).toBe(true);
	expect(isValidName('blog.clove')).toBe(true);
});

test('isValidName rejects path tricks and junk', () => {
	expect(isValidName('')).toBe(false);
	expect(isValidName('../json/reserved')).toBe(false);
	expect(isValidName('a..b')).toBe(false);
	expect(isValidName('-start')).toBe(false);
	expect(isValidName('x'.repeat(64))).toBe(false);
});

test('isReserved matches exact names and whole-name patterns', () => {
	const reserved = ['admin', 'ns[0-9]+'];

	expect(isReserved('admin', reserved)).toBe(true);
	expect(isReserved('ns12', reserved)).toBe(true);
	expect(isReserved('dns12', reserved)).toBe(false);
	expect(isReserved('clove', reserved)).toBe(false);
});

test('splitHostname finds the domain and name', () => {
	expect(splitHostname('Example.is-a.wiki')?.name).toBe('example');
	expect(splitHostname('example.is-a.wiki')?.domain.name).toBe('is-a.wiki');
	expect(splitHostname('blog.clove.meowed-at.me')?.name).toBe('blog.clove');
	expect(splitHostname('is-a.wiki')).toBeNull();
	expect(splitHostname('example.com')).toBeNull();
});
