import { browser } from '$app/env';
// db.js
import Dexie from 'dexie';

export let db = new Dexie('todos');

if(browser) {
    if (!(await Dexie.exists(db.name))) {
        console.log("Db does not exist");
        db.version(1).stores({
            actives: 'name, tasks',
            archive: 'name, tasks'
        });
    }

    await db.open();
}
export async function createCategory(categoryName) {
    await changeSchema(categoryName, 'name, tasks');
}

export async function deleteCategory(categoryName) {
    await changeSchema(categoryName, null);
}

async function changeSchema(categoryName, categorySchema) {
    db.close();

    const newDb = new Dexie(db.name);
   
    newDb.on('blocked', ()=>false); // Silence console warning of blocked event.

    // Extract current schema in dexie format:
    const currentSchema = db.tables.reduce((result,{name, schema}) => {
    	result[name] = [
            schema.primKey.src,
            ...schema.indexes.map(idx => idx.src)
      ].join(',');
      return result;
    }, {});
    
    console.log("Version: " + db.verno);
    console.log("Current Schema: ", currentSchema);
    
    // Tell Dexie about current schema:
    newDb.version(db.verno).stores(currentSchema);
    // Tell Dexie about next schema:
    newDb.version(db.verno + 1).stores({
        ...currentSchema,
        [categoryName]: categorySchema
    });
    // Upgrade it:
    return db = await newDb.open();    
}
