import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SERVICE_DATA_LIST } from "@/data/services";


const ServicePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Header />
      
      <main className="relative container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Our Services
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Professional bike maintenance and repair services tailored to your needs. Each service is performed by our expert mechanics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_DATA_LIST.map((service) => (
            <div
              key={service.id}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
              
              <div className="relative h-full backdrop-blur-sm bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-cyan-500 transition-all duration-300">
                {service.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-60" />
                      <span className="relative px-3 py-1 bg-cyan-500 text-xs font-semibold text-white rounded-full">
                        Popular Choice
                      </span>
                    </div>
                  </div>
                )}

                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative h-16 w-16 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-60" />
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="relative w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-center mb-3">
                    {service.name}
                  </h2>
                  
                  <p className="text-gray-400 text-sm mb-4 text-center">
                    {service.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-gray-300">Includes:</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-xs text-gray-400">
                            <svg className="w-4 h-4 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Duration: {service.duration}</span>
                      <span className="text-lg font-bold text-cyan-400">{service.price}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicePage;