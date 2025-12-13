import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, PenLine, Sparkles, Upload } from "lucide-react";
import { WaitlistForm } from "@/components/waitlist-form";

export default function HomePage() {
  return (
    <div>
      <Navbar />

      <main className="container">
        {/* Hero */}
        <section className="mx-auto grid min-h-[70vh] place-items-center py-16">
          <div className="max-w-3xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> New: Instant preview before export
            </p>
            <h1 className="text-balance text-5xl font-bold tracking-tight md:text-6xl">
              Your handwriting, turned into a beautiful font
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              FriendlyFonts lets you generate an installable font from your own handwriting — perfect for branding, notes, and personal touches.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/generate">Generate my font</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href="#how">See how it works</Link>
              </Button>
            </div>
            <div className="mt-8">
              <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2 rounded-lg border p-2 text-xs text-muted-foreground sm:text-sm">
                <div className="rounded-md bg-muted/40 p-3">A B C</div>
                <div className="rounded-md bg-muted/40 p-3 italic">hello world</div>
                <div className="rounded-md bg-muted/40 p-3">123 ! ?</div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Create your font in three simple steps
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary">
                    <PenLine className="h-5 w-5" />
                    <CardTitle>Write the template</CardTitle>
                  </div>
                  <CardDescription>
                    Print and fill our{' '}
                    <a href="/handwriting-template.html" target="_blank" className="underline">
                      template
                    </a>{' '}
                    with your handwriting.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Use your favorite pen and write naturally. We support Latin characters and punctuation.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary">
                    <Upload className="h-5 w-5" />
                    <CardTitle>Scan or upload</CardTitle>
                  </div>
                  <CardDescription>Take a clear photo or scan and upload to FriendlyFonts.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  We auto-align, vectorize, and hint glyphs for crisp rendering.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                    <CardTitle>Preview and export</CardTitle>
                  </div>
                  <CardDescription>Customize spacing, preview, then export OTF/TTF/Web.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Install your font on macOS, Windows, Figma, Notion, and the web.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Designed for creators and startups
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Crisp vector output</CardTitle>
                  <CardDescription>Smart vectorization and hinting for every glyph.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Export high‑quality OTF/TTF with kerning pairs and consistent baselines.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Brand‑ready customization</CardTitle>
                  <CardDescription>Tune letter spacing, alternates, and stylistic sets.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Dial in the voice of your brand with precise controls.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Instant previews</CardTitle>
                  <CardDescription>See your font in UI mocks and docs before export.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Preview text, headings, and paragraphs in one click.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Private by default</CardTitle>
                  <CardDescription>Your scans are processed securely and can be deleted.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  We do not use your data to train models without explicit consent.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Ready to see your handwriting as a font?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Start generating your custom font right now, or join the waitlist for early access to advanced features.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/generate">Generate Font Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#waitlist">Join Waitlist</Link>
              </Button>
            </div>
            <div className="mt-8" id="waitlist">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} FriendlyFonts</p>
          <div className="flex gap-4">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
