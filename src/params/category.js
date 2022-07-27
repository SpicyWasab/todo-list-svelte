import { db } from '$lib/db';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    return db.tables.some(table => table.name === param);
}