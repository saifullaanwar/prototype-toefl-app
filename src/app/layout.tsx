import "./globals.css";

export const metadata = {
  title: "Eduveritas TOEFL CBT",
  description: "TOEFL Prediction Test Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
