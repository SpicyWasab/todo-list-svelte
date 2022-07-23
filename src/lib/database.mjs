let db;

export async function init() {
    await initDatabase();
    return fetchTodos();
}

function initDatabase() {
    return new Promise((resolve, reject) => {
        console.log('Initializing database ...');

        let request = window.indexedDB.open('todos', 1);

        request.onerror = () => {
            reject();
        }
        
        request.onsuccess = e => {
            db = e.target.result;
            console.log('Database successfully initialized !');
            resolve();
        }

        request.onupgradeneeded = (e) => {
            console.log('Creating database ...');
            db = e.target.result;

            let todoStore = db.createObjectStore('actives', { keyPath: 'id', autoIncrement: true });

            todoStore.createIndex('name', 'name', { unique: false });
            todoStore.createIndex('todos', 'todos', { unique: false });
            todoStore.createIndex('folder', 'folder')

            console.log('Database successfully created !');
        }
    });
}

export async function fetchTodos() {
    let transaction = db.transaction('actives', 'readonly');

    transaction.onerror = error => {
        console.error(error);
        throw error;
    }

    const store = transaction.objectStore('actives');

    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onerror = error => {
            console.error(error);
            reject();
        }

        request.onsuccess = e => {
            const todos = request.result.reverse();
            resolve(todos);
        }
    });
}

export async function createList(name) {
    const transaction = db.transaction('actives', 'readwrite');

    transaction.onerror = error => {
        throw error;
    }
    
    const store = transaction.objectStore('actives');
    
    const listDatas = {
        name,
        todos: [],
        folder: undefined
    }

    let request = store.add(listDatas);

    return new Promise((resolve, reject) => {
        request.onerror = error => {
            reject(error);
        }

        request.onsuccess = async () => {
            await updateTodosState();
            resolve();
        }
   });
}

export async function createTask(name, list) {
    const transaction = db.transaction('actives', 'readwrite');

    transaction.onerror = error => {
        throw error;
    }
    
    const store = transaction.objectStore('actives');
    
    const task = {
        name,
        done: false
    }

    list.todos.push(task)

    let request = store.put(list);

    return new Promise((resolve, reject) => {
        request.onerror = error => {
            reject(error);
        }

        request.onsuccess = async () => {
            await updateTodosState();
            resolve(list);
        }
   });
}

export async function toggleTaskDone(taskName, list) {
    const transaction = db.transaction('actives', 'readwrite');

    transaction.onerror = error => {
        throw error;
    }
    
    const store = transaction.objectStore('actives');

    const task = list.todos.find(task => task.name === taskName);

    task.done = !task.done;

    let request = store.put(list);

    return new Promise((resolve, reject) => {
        request.onerror = error => {
            reject(error);
        }

        request.onsuccess = async () => {
            await updateTodosState();
            resolve(list);
        }
   });
}

export async function deleteTask(taskName, list) {
    const transaction = db.transaction('actives', 'readwrite');

    transaction.onerror = error => {
        throw error;
    }
    
    const store = transaction.objectStore('actives');
    
    const taskIndex = list.todos.findIndex(task => task.name === taskName);

    list.todos.splice(taskIndex, 1);

    let request = store.put(list);

    return new Promise((resolve, reject) => {
        request.onerror = error => {
            reject(error);
        }

        request.onsuccess = async () => {
            await updateTodosState();
            resolve(list);
        }
   });
}