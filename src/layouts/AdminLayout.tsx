import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <main className="text-white">
      <Outlet />
    </main>
  );
}
