import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const serviceDataList = [
  {
    id: 1,
    name: "General Service",
    description: "Complete check-up and maintenance for your bike",
    imageUrl: "https://promechanic.co.in/wp-content/uploads/2023/02/settings.png",
  },
  {
    id: 2,
    name: "Custom Service",
    description: "Tailored service options based on your bike's needs",
    imageUrl: "https://promechanic.co.in/wp-content/uploads/2023/02/wrench-1.png",
  },
  {
    id: 3,
    name: "Bike Custom",
    description: "Personalize your bike with custom parts and styling",
    imageUrl: "https://promechanic.co.in/wp-content/uploads/2023/02/bike-1.png",
  },
];

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-3xl opacity-10" />
      <div className="relative backdrop-blur-sm bg-gray-800/30 rounded-3xl p-8 md:p-12 border border-gray-700">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6 flex justify-center">
          Professional Bike Service & Repair
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Expert care for your ride, every time. We provide top-quality service to keep your bike in perfect condition.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/booking-service" className="w-full sm:w-auto">
            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-6 rounded-full transition-all transform hover:scale-[1.02]">
              Book Service Now
            </Button>
          </Link>
          <Link to="/services" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-200/50 text-gray-700 py-6 rounded-full">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ServicesSection = ({ services }) => {
  return (
    <div className="relative">
      <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-white text-center mb-12">
        Our Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card
            key={service.id}
            className="group backdrop-blur-sm bg-gray-800/50 border-gray-700 hover:border-cyan-500 transition-all duration-300"
          >
            <CardHeader>
              <div className="relative h-16 w-16 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-60" />
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="relative w-full h-full object-contain"
                />
              </div>
              <CardTitle className="text-xl text-white text-center group-hover:text-cyan-400 transition-colors">
                {service.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-center">
                {service.description}
              </p>
              <div className="mt-6 text-center">
                <Button variant="outline" className="rounded-full border-gray-600 hover:bg-gray-200/50 text-gray-700">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const PromotionSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* First div - gradient background */}
      <div className="absolute bg-gradient-to-r from-cyan-500 to-blue-500 blur-3xl opacity-20" />
      
      {/* Second div - content container */}
      <div className="relative backdrop-blur-sm bg-gray-800/50 rounded-3xl p-8 md:p-12 border border-gray-700">
        {/* Third div - flex container */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
              Spring Service Special!
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              Get 15% off on all general services this month. Use code SPRING25 when booking.
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-full transition-all transform hover:scale-[1.02]">
              Claim Offer
            </Button>
          </div>
          <img 
            src="https://promechanic.co.in/wp-content/uploads/2023/02/bike-1.png" 
            alt="Promotion"
            className="w-40 h-40 object-contain opacity-90" 
          />
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "King Anthony",
      comment: "Best bike service in town! They fixed my mountain bike perfectly and gave great advice on maintenance.",
      rating: 5
    },
    {
      id: 2,
      name: "Lebron James",
      comment: "Quick service and reasonable prices. My vintage road bike feels like new again.",
      rating: 5
    },
    {
      id: 3,
      name: "Mulyono Solo",
      comment: "Professional staff and excellent work on my electric bike. Highly recommended!",
      rating: 4
    }
  ];

  return (
    <div className="mb-24 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 italic mb-4">"{testimonial.comment}"</p>
              <p className="text-cyan-400 font-medium">{testimonial.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Grid overlay pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Header />
      
      <main className="relative container mx-auto px-4 py-16 z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Services Section with Glow */}
        <div className="relative mt-32">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-3xl opacity-10" />
          <ServicesSection services={serviceDataList} />
        </div>
        
        {/* Promotion Section */}
        <div className="mt-32">
          <PromotionSection />
        </div>
        
        {/* Testimonials with Glassmorphism */}
        <div className="mt-32">
          <TestimonialsSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
