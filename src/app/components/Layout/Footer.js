export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm">
                            © {new Date().getFullYear()} Bütçe Takip By Mert Öztürk. Tüm hakları saklıdır.
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a
                            href="#"
                            className="text-sm hover:text-white transition-colors"
                        >
                            Gizlilik Politikası
                        </a>
                        <a
                            href="#"
                            className="text-sm hover:text-white transition-colors"
                        >
                            Kullanım Koşulları
                        </a>
                        <a
                            href="#"
                            className="text-sm hover:text-white transition-colors"
                        >
                            İletişim
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}