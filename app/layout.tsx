export const metadata = {
  title: 'AI Pipeline Debugger',
  description: 'Self-healing LLM and API workflow debugger',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f4f6f8" }}>{children}</body>
    </html>
  );
}
