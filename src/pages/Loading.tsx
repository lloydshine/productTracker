import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <section className="flex h-screen">
      <Loader2 className=" animate-spin m-auto" />
    </section>
  );
}
