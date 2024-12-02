// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		
		interface Locals {
			user: User | null;  // Replace 'User' with your actual user type
			getSession: () => Promise<Session | null>;
		}
		
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		
		interface Session {
			user: User;
			// Add other session properties if needed
		}
	}
}

export {};
