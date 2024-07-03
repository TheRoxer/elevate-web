import Button from "@/components/landing/Button";

export default function Home() {
  return (
    <>
      <main className="flex justify-center items-center h-full mt-8">
        <Button href="https://example.com" className="mt-4">
          Styled Link
        </Button>

        <Button href="https://example.com" className="mt-4" unstyled>
          Unstyled Link
        </Button>
      </main>
    </>
  );
}
