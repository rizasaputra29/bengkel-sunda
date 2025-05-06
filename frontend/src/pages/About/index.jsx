import Header from "@/components/header";
import Footer from "@/components/footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      
      <Header />
      
      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              About <span className="text-red-600">Bengkel Sunda</span>
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Your trusted partner in motorcycle care and maintenance since 2010
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-4">Our Vision</h2>
              <p className="text-gray-700">
                To be the leading motorcycle service provider, delivering excellence through innovation and customer satisfaction.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-4">Our Mission</h2>
              <p className="text-gray-700">
                Providing professional motorcycle services with integrity, expertise, and commitment to customer satisfaction.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center ">
              Why Choose
              <span className="text-red-600"> Us</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Expert Mechanics",
                  description: "Highly skilled and certified technicians"
                },
                {
                  title: "Modern Equipment",
                  description: "State-of-the-art diagnostic and repair tools"
                },
                {
                  title: "Quality Service",
                  description: "Consistent, reliable, and professional service"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;