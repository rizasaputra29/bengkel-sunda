// src/pages/Contact.jsx
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";
import Logo from "@/assets/Logo.png";

// Common styles to use across all pages
const commonStyles = {
  container: "bg-white rounded-3xl p-8 border border-gray-200 shadow-sm",
  heading: "text-4xl md:text-5xl font-bold text-black",
  accent: "text-red-600",
  text: "text-gray-700",
  input: "bg-white border-gray-200 rounded-xl focus:border-red-500 text-gray-800",
  button: "bg-red-600 hover:bg-red-700 text-white font-medium",
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        logo_url: Logo
      };

      await emailjs.send(
        import.meta.env.VITE_SERVICE_NAME,
        import.meta.env.VITE_CONTACT_TEMPLATE,
        templateParams,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      );

      setStatus({
        type: 'success',
        message: 'Message sent successfully!'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      
      <Header />
      
      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className={commonStyles.heading}>
              Contact <span className={commonStyles.accent}>Us</span>
            </h1>
            <p className={commonStyles.text}>
              Get in touch with us for any questions or concerns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className={commonStyles.container}>
              <h2 className="text-2xl font-bold text-black mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={commonStyles.input}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={commonStyles.input}
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`${commonStyles.input} h-32`}
                  required
                />

                {status.message && (
                  <div className={`p-4 rounded-xl ${
                    status.type === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {status.message}
                  </div>
                )}

                <Button 
                  type="submit"
                  className={`w-full rounded-xl ${commonStyles.button}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className={commonStyles.container}>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-black">Phone</h3>
                      <p className={commonStyles.text}>+1234567890</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-black">Email</h3>
                      <p className={commonStyles.text}>contact@bengkelsunda.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-black">Address</h3>
                      <p className={commonStyles.text}>123 Workshop Street, Bandung, Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className={commonStyles.container}>
                <h3 className="font-semibold text-black mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
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