import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Pais e Bebês
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Homepage
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/produtos" className="text-gray-600 hover:text-gray-900">
              Melhores produtos
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
} 