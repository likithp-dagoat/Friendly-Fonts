"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { Download, Printer } from "lucide-react";
import html2pdf from "html2pdf.js";

export default function HandwritingTemplatePage() {
  const templateRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!templateRef.current) return;

    const element = templateRef.current;
    const opt = {
      margin: 0.5, // inches
      filename: "handwriting-template.pdf",
      image: { type: 'jpeg' as 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: { 
        unit: "in", 
        format: "a4", 
        orientation: "portrait" as const, 
      },
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  // Character arrays
  const uppercaseChars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  const lowercaseChars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const numbers = ['0','1','2','3','4','5','6','7','8','9'];
  const punctuation = ['.', ',', '!', '?', ':', ';', "'", '"', '-', '_', '(', ')', '@', '#', '$', '%', '&', '*'];

  return (
    <div>
      <Navbar />
      
      <main className="container py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Handwriting Template
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Download and fill out this template with your handwriting to create your custom font
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handlePrintPDF} variant="outline" size="lg">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button onClick={handleDownloadPDF} size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download as PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Template Content */}
        <div 
          ref={templateRef}
          className="template-content bg-white"
          style={{ 
            maxWidth: "21cm", 
            margin: "0 auto",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            lineHeight: 1.6,
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 style={{ margin: 0, fontSize: "24px" }}>
              FriendlyFonts Handwriting Template
            </h1>
            <p>Fill out this template with your handwriting to create your custom font</p>
          </div>

          {/* Instructions */}
          <div style={{ 
            backgroundColor: "#f5f5f5", 
            padding: "15px", 
            borderRadius: "5px", 
            marginBottom: "20px" 
          }}>
            <h2 style={{ marginTop: 0, fontSize: "18px" }}>Instructions</h2>
            <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
              <li>Print this page on standard 8.5" x 11" (A4) paper</li>
              <li>Use a black pen with medium tip (0.7mm - 1.0mm recommended)</li>
              <li>Write naturally and consistently - this is how your font will look!</li>
              <li>Fill each box with the character shown above it</li>
              <li>Keep letters within the boxes and avoid touching the borders</li>
              <li>Scan or take a clear photo of the completed template</li>
              <li>Save as PDF and upload to FriendlyFonts</li>
            </ul>
          </div>

          {/* Uppercase Letters */}
          <div className="section" style={{ marginBottom: "30px" }}>
            <div style={{ 
              fontSize: "16px", 
              fontWeight: "bold", 
              marginBottom: "10px", 
              borderBottom: "2px solid #333", 
              paddingBottom: "5px" 
            }}>
              Uppercase Letters (A-Z)
            </div>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 1fr)", 
              gap: "15px", 
              marginBottom: "20px" 
            }}>
              {uppercaseChars.map((char) => (
                <div key={char} style={{ textAlign: "center" }}>
                  <div style={{ 
                    border: "2px solid #333", 
                    height: "60px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontSize: "24px", 
                    fontWeight: "bold", 
                    backgroundColor: "#fff" 
                  }}>
                    {char}
                  </div>
                  <div style={{ 
                    textAlign: "center", 
                    fontSize: "12px", 
                    marginTop: "5px", 
                    color: "#666" 
                  }}>
                    {char}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lowercase Letters */}
          <div className="section" style={{ marginBottom: "30px" }}>
            <div style={{ 
              fontSize: "16px", 
              fontWeight: "bold", 
              marginBottom: "10px", 
              borderBottom: "2px solid #333", 
              paddingBottom: "5px" 
            }}>
              Lowercase Letters (a-z)
            </div>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 1fr)", 
              gap: "15px", 
              marginBottom: "20px" 
            }}>
              {lowercaseChars.map((char) => (
                <div key={char} style={{ textAlign: "center" }}>
                  <div style={{ 
                    border: "2px solid #333", 
                    height: "60px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontSize: "24px", 
                    fontWeight: "bold", 
                    backgroundColor: "#fff" 
                  }}>
                    {char}
                  </div>
                  <div style={{ 
                    textAlign: "center", 
                    fontSize: "12px", 
                    marginTop: "5px", 
                    color: "#666" 
                  }}>
                    {char}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Numbers */}
          <div className="section" style={{ marginBottom: "30px" }}>
            <div style={{ 
              fontSize: "16px", 
              fontWeight: "bold", 
              marginBottom: "10px", 
              borderBottom: "2px solid #333", 
              paddingBottom: "5px" 
            }}>
              Numbers (0-9)
            </div>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(5, 1fr)", 
              gap: "15px", 
              marginBottom: "20px" 
            }}>
              {numbers.map((char) => (
                <div key={char} style={{ textAlign: "center" }}>
                  <div style={{ 
                    border: "2px solid #333", 
                    height: "60px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontSize: "24px", 
                    fontWeight: "bold", 
                    backgroundColor: "#fff" 
                  }}>
                    {char}
                  </div>
                  <div style={{ 
                    textAlign: "center", 
                    fontSize: "12px", 
                    marginTop: "5px", 
                    color: "#666" 
                  }}>
                    {char}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Punctuation */}
          <div className="section" style={{ marginBottom: "30px" }}>
            <div style={{ 
              fontSize: "16px", 
              fontWeight: "bold", 
              marginBottom: "10px", 
              borderBottom: "2px solid #333", 
              paddingBottom: "5px" 
            }}>
              Punctuation & Symbols
            </div>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(6, 1fr)", 
              gap: "15px", 
              marginBottom: "20px" 
            }}>
              {punctuation.map((char) => (
                <div key={char} style={{ textAlign: "center" }}>
                  <div style={{ 
                    border: "2px solid #333", 
                    height: "60px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontSize: "24px", 
                    fontWeight: "bold", 
                    backgroundColor: "#fff" 
                  }}>
                    {char}
                  </div>
                  <div style={{ 
                    textAlign: "center", 
                    fontSize: "12px", 
                    marginTop: "5px", 
                    color: "#666" 
                  }}>
                    {char}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Words */}
          <div style={{ marginTop: "20px" }}>
            <div style={{ 
              fontSize: "16px", 
              fontWeight: "bold", 
              marginBottom: "10px", 
              borderBottom: "2px solid #333", 
              paddingBottom: "5px" 
            }}>
              Sample Words (Optional - for spacing reference)
            </div>
            <div style={{ 
              border: "1px solid #ccc", 
              height: "40px", 
              marginBottom: "10px", 
              padding: "5px" 
            }}>
              The quick brown fox jumps over the lazy dog
            </div>
            <div style={{ 
              border: "1px solid #ccc", 
              height: "40px", 
              marginBottom: "10px", 
              padding: "5px" 
            }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </div>
            <div style={{ 
              border: "1px solid #ccc", 
              height: "40px", 
              marginBottom: "10px", 
              padding: "5px" 
            }}>
              abcdefghijklmnopqrstuvwxyz
            </div>
            <div style={{ 
              border: "1px solid #ccc", 
              height: "40px", 
              marginBottom: "10px", 
              padding: "5px" 
            }}>
              0123456789
            </div>
          </div>

          {/* Footer */}
          <div style={{ 
            textAlign: "center", 
            marginTop: "30px", 
            fontSize: "12px", 
            color: "#666" 
          }}>
            <p>FriendlyFonts - Turn your handwriting into a beautiful font</p>
            <p>After filling out this template, scan or photograph it, save as PDF, and upload to friendlyfonts.com</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4 print:hidden">
          <Button onClick={handlePrintPDF} variant="outline" size="lg">
            <Printer className="mr-2 h-4 w-4" />
            Print Template
          </Button>
          <Button onClick={handleDownloadPDF} size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download as PDF
          </Button>
        </div>
      </main>
    </div>
  );
}
