import { X } from "lucide-react";

export default function Modal({
  children,
  state,
  toggle,
}: {
  children: React.ReactNode;
  state: boolean;
  toggle: () => void;
}) {
  if (!state) return null;

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-black/80 p-4 z-50">
      <div className="bg-blue-950 p-6 w-full max-w-md md:max-w-lg lg:max-w-2xl rounded-md">
        <section className="flex justify-end">
          <X onClick={toggle} className="cursor-pointer text-white" />
        </section>
        <div className="max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}
