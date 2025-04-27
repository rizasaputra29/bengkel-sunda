// src/pages/Contact.jsx
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Header />
      
      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Contact Us
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get in touch with us for any questions or concerns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="relative p-6 backdrop-blur-sm bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-xl opacity-10" />
              <div className="relative space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-gray-700/50 border-gray-600 focus:border-cyan-500 text-white"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-gray-700/50 border-gray-600 focus:border-cyan-500 text-white"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-gray-700/50 border-gray-600 focus:border-cyan-500 text-white h-32"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="relative p-6 backdrop-blur-sm bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-xl opacity-10" />
                <div className="relative space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-5 h-5 text-cyan-400 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold">Phone</h3>
                      <p className="text-gray-400">+1234567890</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-cyan-400 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold">Email</h3>
                      <p className="text-gray-400">contact@bengkelsunda.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 text-cyan-400 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold">Address</h3>
                      <p className="text-gray-400">123 Workshop Street, Bandung, Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="relative p-6 backdrop-blur-sm bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-xl opacity-10" />
                <div className="relative">
                  <h3 className="text-white font-semibold mb-4">Business Hours</h3>
                  <div className="space-y-2 text-gray-400">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;