// import { Github, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer({ darkMode }) {
  return (
    <footer className={`border-t ${darkMode?"border-gray-800":"border-gray-200"} py-8`}>
      <div className="container mx-auto px-6">
        <div className="flex md:flex-row flex-col gap-4 justify-between items-center">
          <p className="text-gray-400">© 2024 GenVogue. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/designs" className={`${darkMode?"text-gray-400 hover:text-white":"text-gray-400 hover:text-gray-800"}`}>Designs</Link>
            <Link href="/about" className={`${darkMode?"text-gray-400 hover:text-white":"text-gray-400 hover:text-gray-800"}`}>About</Link>
            <Link href="/contact" className={`${darkMode?"text-gray-400 hover:text-white":"text-gray-400 hover:text-gray-800"}`}>Contact</Link>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-6">
          {/* <Link href="https://github.com" target="_blank">
            <Github className="h-6 w-6 text-gray-400 hover:text-white" />
          </Link>
          <Link href="https://twitter.com" target="_blank">
            <Twitter className="h-6 w-6 text-gray-400 hover:text-white" />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <Instagram className="h-6 w-6 text-gray-400 hover:text-white" />
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
