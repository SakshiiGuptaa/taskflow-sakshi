import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b bg-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">TaskFlow</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          {user?.name}
        </span>

        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}