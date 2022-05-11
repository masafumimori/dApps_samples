import GUN from "gun";
import "gun/sea";
import "gun/axe";
import { writable } from "svelte/store";

// Database
export const db = GUN();

// Gun User
export const user = db.user().recall({ sessionStorage: true });

// Current User's username: global app state
export const username = writable("");

// Set username when alias updates
user.get("alias").on((v) => username.set(v));

// Listen to user login status
db.on("auth", async (event) => {
	const alias = await user.get("alias"); // username string
	username.set(alias);

	console.log(`signed in as ${alias}`);
});
