export const metadata = {
  title: 'Rozana Business Intelligence',
  description: 'Rozana Business Intelligence website.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
