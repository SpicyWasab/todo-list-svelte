import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: [/^@smui(?:-extra)?\//],
	},
	build: {
		target: ["es2022"]
	}
};

export default config;
