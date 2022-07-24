import { get } from 'svelte/store';
import { browser } from '$app/env';
import { todoLists } from '$lib/state';

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
    if(!browser) return; // since the database is IDB, it cannot be checked server-side

    let todos = get(todoLists);

    return todos[param] != undefined; 
}