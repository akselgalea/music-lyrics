import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const res = await fetch(import.meta.env.VITE_API_URL + '/music');
    const json = await res.json();

    return json
}