import Header from "@/components/header";
import Footer from "@/components/footer";


const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Header />
      
      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              About Bengkel Sunda
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Your trusted partner in motorcycle care and maintenance since 2010
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative p-6 backdrop-blur-sm bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-xl opacity-10" />
              <div className="relative">
                <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-gray-400">
                  To be the leading motorcycle service provider, delivering excellence through innovation and customer satisfaction.
                </p>
              </div>
            </div>

            <div className="relative p-6 backdrop-blur-sm bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-xl opacity-10" />
              <div className="relative">
                <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-400">
                  Providing professional motorcycle services with integrity, expertise, and commitment to customer satisfaction.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Why Choose Us
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
                <div key={index} className="relative p-6 backdrop-blur-sm bg-gray-800/50 border border-gray-700 rounded-lg group hover:border-cyan-500 transition-colors">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
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