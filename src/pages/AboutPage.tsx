import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 font-sans text-gray-800 text-center min-h-screen flex flex-col justify-between">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg text-gray-700 mt-2">
          Informacje o autorach oraz stronie
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-lg text-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">My i nasza misja</h2>
          <p className="leading-relaxed">
            Zespół 3 studentów Informatyki tworzących aplikacje w ramach
            zaliczenia przedmiotu Programowanie systemów mobilnych na
            Uniwersytecie Ekonomicznym w Krakowie.
          </p>
          <p>
            {' '}
            Wierzymy, że dobre jedzenie powinno być łatwo dostępne dla każdego,
            dlatego postanowiliśmy stworzyć aplikację, która to umożliwi. Naszą
            misją jest nie tylko ułatwienie zamawiania jedzenia, ale także
            wspieranie lokalnych restauracji
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">O aplikacji</h2>
          <p className="leading-relaxed">
            Nasza aplikacja umożliwia szybki i wygodny sposób przeglądania
            dostępnych restauracji oraz ich menu. Wyszukaj lokal w twojej
            okolicy, wybierz odpowiadające Ci pozycje z menu oraz miejsce
            dostawy, a my dostarczymy jedzenie pod twoje drzwi w mgnieniu oka,
            abyś mogł delektować się swoim wyborem najszybciej jak to możliwe.
            Oferujemy ciagłe wspracie oraz zadośćuczynienia w razie wystąpienia
            komplikacji w procesie zamawiania.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-center gap-12 mb-12 items-center">
        {[
          { name: 'Wojciech Bubula', initials: 'WB' },
          { name: 'Jakub Bujak', initials: 'JB' },
          { name: 'Robert Ciepliński', initials: 'RC' },
        ].map((person, index) => (
          <div key={index} className="flex flex-col items-center text-lg">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-2xl">
                {person.initials}
              </AvatarFallback>
            </Avatar>
            <p className="mt-3 font-medium text-xl">{person.name}</p>
          </div>
        ))}
      </div>

      <footer className="w-full flex flex-col md:flex-row justify-between items-start text-gray-600 text-lg mt-12 pb-6">
        <div className="flex flex-col sm:items-center sm:w-full sm:text-center md:items-center md:text-center md:w-auto mb-6 md:mb-0">
          <p className="font-semibold">Kontakt:</p>
          <p>goodfood@gmail.com</p>
        </div>

        <hr className="sm:hidden border-t-2 border-gray-300 my-4 w-full" />

        <div className="flex flex-col sm:items-center sm:w-full sm:text-center md:items-center md:text-center md:w-auto">
          <p className="font-semibold mb-2">Nasze media społecznościowe:</p>
          <div className="flex gap-6 justify-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-7 h-7 text-gray-500 hover:text-blue-600" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-7 h-7 text-gray-500 hover:text-blue-400" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-7 h-7 text-gray-500 hover:text-pink-500" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
