import HeicConverter from '@/components/HeicConverter';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'HEIC to PNG Converter',
  description: 'Convert HEIC and HEIF images to PNG format instantly. Free, fast, and secure online converter.',
  url: 'https://heictopng.vercel.app',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  author: {
    '@type': 'Organization',
    name: 'HEIC Converter'
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <HeicConverter />
      </div>
    </>
  );
}
