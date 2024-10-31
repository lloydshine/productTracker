import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <main className="text-white h-screen p-10">
      <Outlet />
    </main>
  );
}
