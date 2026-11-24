import Converter from '@/components/Converter';
import JsonLd from '@/components/JsonLd';
import { FAQS } from '@/lib/site';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Converter />

        {/* About / FAQ */}
        <section
          aria-labelledby="about-heading"
          className="max-w-3xl mx-auto mt-16 bg-white rounded-lg shadow-lg p-8 border border-gray-200"
        >
          <h2 id="about-heading" className="text-2xl font-semibold text-gray-800 mb-4">
            Convert Markdown to PDF or Word online
          </h2>
          <p className="text-gray-600 mb-8">
            Upload a Markdown file, check the live preview, and download it as a PDF
            or a Word (.docx) document. The conversion runs in your browser, so your
            file stays on your device.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {FAQS.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="font-semibold text-gray-800 mb-1">{question}</h3>
                <p className="text-gray-600">{answer}</p>
              </div>
            ))}
          </div>
        </section>
        <JsonLd data={faqJsonLd} />

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 text-sm">
          <p>Built with Next.js and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
