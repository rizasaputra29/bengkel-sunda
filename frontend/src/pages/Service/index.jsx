import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SERVICE_DATA_LIST } from "@/data/services";
import { Link } from "react-router-dom";

const commonStyles = {
  container: "bg-white rounded-3xl p-8 border border-gray-200 shadow-sm",
  heading: "text-4xl md:text-5xl font-bold text-black",
  accent: "text-red-600",
  text: "text-gray-700",
  button: "bg-red-600 hover:bg-red-700 text-white font-medium",
};

const ServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      
      <Header />
      
      <main className="relative container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <h1 className={commonStyles.heading}>
            Our <span className={commonStyles.accent}>Services</span>
          </h1>
          <p className={commonStyles.text}>
            Professional bike maintenance and repair services tailored to your needs. Each service is performed by our expert mechanics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_DATA_LIST.map((service) => (
            <div key={service.id} className={`${commonStyles.container} relative`}>
              {service.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500 rounded-full blur opacity-20"></div>
                    <span className="relative px-4 py-1.5 bg-red-600 text-xs font-semibold text-white rounded-full shadow-sm">
                      Popular Choice
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative h-16 w-16 transform hover:scale-110 transition-transform duration-300">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-black text-center mb-3">
                  {service.name}
                </h2>
                
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {service.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-800">Includes:</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-xs text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Duration: {service.duration}</span>
                    <span className="text-lg font-bold text-red-600">{service.price}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Link to="/booking-service" className="block">
                    <button className={`w-full rounded-xl py-2 px-4 ${commonStyles.button}`}>
                      Book Now
                    </button>
                  </Link>
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