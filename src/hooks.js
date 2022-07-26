/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    console.log('test');
    
    return resolve(event, {
        ssr: false
    });
}