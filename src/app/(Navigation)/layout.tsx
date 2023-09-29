import ScrollToTopButton from "@/components/ScrollToTopButtom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <ScrollToTopButton />
    </>
  );
}
