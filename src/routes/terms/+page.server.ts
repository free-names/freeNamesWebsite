/* src/routes/terms/+page.server.ts
 * MIT Licence — (c) Free Names
 */

import { marked } from 'marked';
import terms from '#lib/markdown/TOS.md?raw';

// Rendered once at build time, so no markdown parser ships to the Worker
export const prerender = true;

export function load() {
	return {
		html: marked.parse(terms, { async: false })
	};
}
