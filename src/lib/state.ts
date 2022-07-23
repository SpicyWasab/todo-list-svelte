import { writable } from 'svelte/store';

type Task = {
    name: string,
    done: boolean
}

type List = {
    name: string,
    id: number,
    todos: Array<Task>
}

let todoListsValue: Array<List> = [];

export const todoLists = writable(todoListsValue);
export const currentList = writable();
export const databaseStarted = writable(false);