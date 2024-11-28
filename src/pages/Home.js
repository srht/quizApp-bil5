import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-poppins p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Üst Kısım - Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            bil<span className="text-emerald-500">5</span>
          </h1>
        </motion.div>

        {/* Ana Kart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-0 md:p-12 relative overflow-hidden"
        >
          {/* Dekoratif Elementler - Mobilde gizlenebilir */}
          <div className="hidden md:block absolute top-0 right-0 w-40 h-40 bg-emerald-100/50 rounded-full blur-3xl"></div>
          <div className="hidden md:block absolute bottom-0 left-0 w-60 h-60 bg-emerald-50/50 rounded-full blur-3xl"></div>

          {/* İçerik */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Bilgi Kutusu */}
            <div className="bg-white backdrop-blur-sm rounded-xl p-4 md:p-8 mb-6 md:mb-12 w-full max-w-lg">
              <div className="flex items-center space-x-4 md:space-x-6 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                       className="h-6 w-6 md:h-8 md:w-8 text-emerald-600" 
                       fill="none" 
                       viewBox="0 0 24 24" 
                       stroke="currentColor">
                    <path strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1">Bilgi Yarışması</h2>
                  <p className="text-sm md:text-base text-gray-500">Genel kültür soruları ile kendini test et</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs md:text-sm text-gray-500 bg-gray-50/50 rounded-xl p-3 md:p-4 space-y-2 md:space-y-0">
                <span>• Toplam soru sayısı: 5</span>
                <span>• Sınırsız deneme hakkı</span>
              </div>
            </div>

            {/* Başlat Butonu */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/quiz')}
              className="w-full md:w-auto bg-emerald-500 text-white font-medium px-8 md:px-12 py-3 md:py-4 rounded-xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all duration-300 text-sm md:text-base"
            >
              Yarışmaya Başla
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Home;
