import { createUser } from "./server";


export default function RegisterPage() {
    return (
    <form action={createUser} className="mx-auto max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">Create account</h1>
        <div>
            <label className="block text-sm">Name</label>
            <input className="mt-1 w-full rounded border px-3 py-2" name="name" type="text" />
        </div>
        <div>
            <label className="block text-sm">Email</label>
            <input className="mt-1 w-full rounded border px-3 py-2" name="email" type="email" required />
        </div>
        <div>
            <label className="block text-sm">Password</label>
            <input className="mt-1 w-full rounded border px-3 py-2" name="password" type="password" required />
        </div>
        <button className="w-full rounded bg-neutral-900 px-3 py-2 text-white">Create account</button>
    </form>
    );
}