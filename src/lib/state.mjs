import { writable } from 'svelte/store';

export const todoLists = writable([]);
export const currentList = writable();