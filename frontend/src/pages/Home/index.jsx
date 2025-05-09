import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const serviceDataList = [
  {
    id: 1,
    name: "General Service",
    description: "Complete check-up and maintenance for your vehicle",
    imageUrl:
      "https://promechanic.co.in/wp-content/uploads/2023/02/settings.png",
  },
  {
    id: 2,
    name: "Custom Service",
    description: "Tailored service options based on your vehicle's needs",
    imageUrl:
      "https://promechanic.co.in/wp-content/uploads/2023/02/wrench-1.png",
  },
  {
    id: 3,
    name: "Bike Custom",
    description: "Personalize your vehicle with custom parts and styling",
    imageUrl: "https://promechanic.co.in/wp-content/uploads/2023/02/bike-1.png",
  },
];

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 rounded-3xl blur-3xl opacity-20" />
      <div className="relative bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm">
        <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 flex justify-center">
          Professional Service & {" "}
          <span className="text-red-600 ml-2">Repair</span>
        </h1>
        <p className="text-gray-800 text-lg md:text-xl mb-8 max-w-2xl mx-auto text-center">
          Expert care for your ride, every time. We provide top-quality service
          to keep your vehicle in perfect condition.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/booking-service" className="w-full sm:w-auto">
            <Button className="w-full bg-red-600 hover:bg-red-900 text-white font-semibold py-6 rounded-full transition-all transform hover:scale-[1.02]">
              Book Service Now
            </Button>
          </Link>
          <Link to="/services" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-800 py-6 rounded-full"
            >
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
      <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
        Our <span className="text-red-600">Services</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card
            key={service.id}
            className="group bg-white border-gray-200 hover:border-red-300 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <CardHeader>
              <div className="relative h-16 w-16 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-red-400 rounded-full blur opacity-10 group-hover:opacity-20" />
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="relative w-full h-full object-contain"
                />
              </div>
              <CardTitle className="text-xl text-black text-center group-hover:text-red-600 transition-colors">
                {service.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-center">{service.description}</p>
              <div className="mt-6 text-center">
                <Link to={`/services`}>
                <Button
                  variant="outline"
                  className="rounded-full border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-800"
                >
                  Learn More
                </Button>
                </Link>
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
      <div className="absolute bg-gradient-to-r from-red-50 to-red-100 blur-3xl opacity-20" />

      {/* Second div - content container */}
      <div className="relative bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm">
        {/* Third div - flex container */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Spring Service <span className="text-red-600">Special!</span>
            </h3>
            <p className="text-gray-800 text-lg mb-6">
              Get 15% off on all general services this month. Use code SPRING25
              when booking.
            </p>
            <Link to="/booking-service">
            <Button className="bg-red-600 hover:bg-red-900 text-white font-semibold rounded-full transition-all transform hover:scale-[1.02]">
              Claim Offer
            </Button>
            </Link>
          </div>
          <img
            src="https://promechanic.co.in/wp-content/uploads/2023/02/bike-1.png"
            alt="Promotion"
            className="w-40 h-40 object-contain"
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
      comment:
        "Best vehicle service in town! They fixed my mountain vehicle perfectly and gave great advice on maintenance.",
      rating: 5,
    },
    {
      id: 2,
      name: "Lebron James",
      comment:
        "Quick service and reasonable prices. My vintage road vehicle feels like new again.",
      rating: 5,
    },
    {
      id: 3,
      name: "Mulyono Solo",
      comment:
        "Professional staff and excellent work on my electric vehicle. Highly recommended!",
      rating: 4,
    },
  ];

  return (
    <div className="mb-24 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
        What Our <span className="text-red-600">Customers</span> Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="bg-white border-gray-200 shadow-sm"
          >
            <CardContent className="pt-6">
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-800 italic mb-4">
                "{testimonial.comment}"
              </p>
              <p className="text-red-600 font-medium">{testimonial.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Very subtle grid overlay pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      <Header />

      <main className="relative container mx-auto px-4 py-16 z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <div className="relative mt-32">
          <ServicesSection services={serviceDataList} />
        </div>

        {/* Promotion Section */}
        <div className="mt-32">
          <PromotionSection />
        </div>

        {/* Testimonials */}
        <div className="mt-32">
          <TestimonialsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
