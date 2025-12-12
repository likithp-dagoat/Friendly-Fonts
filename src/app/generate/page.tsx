import { Navbar } from "@/components/ui/navbar";
import { PDFUpload } from "@/components/pdf-upload";

export default function GeneratePage() {
  return (
    <div>
      <Navbar />
      <main className="container py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Generate Your Font
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Upload your handwriting template to create your custom font
            </p>
          </div>
          <PDFUpload />
        </div>
      </main>
    </div>
  );
}

