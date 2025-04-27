import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import yourBookingContext from "../../context/yourBookingContext";
import emailjs from "@emailjs/browser";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SERVICE_DATA_LIST } from "@/data/services";

// Initial form state
const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  phoneNumber: "",
  date: "",
  vehicleNumber: "",
  userSelectedServices: [],
};

const BookingService = () => {
  // Initialize service data with checked property
  const [serviceData, setServiceData] = useState(
    SERVICE_DATA_LIST.map(service => ({ ...service, serviceCheckBox: false }))
  );
  
  const [userData, setUserData] = useState(INITIAL_FORM_STATE);
  const [bookingStatus, setBookingStatus] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleServiceSelection = (serviceName, isChecked) => {
    setServiceData(prevServices =>
      prevServices.map(service =>
        service.name === serviceName 
          ? { ...service, serviceCheckBox: isChecked } 
          : service
      )
    );

    // Update userSelectedServices array with the full service objects
    setUserData(prevData => {
      const selectedService = serviceData.find(s => s.name === serviceName);
      const updatedServices = isChecked
        ? [...prevData.userSelectedServices, selectedService]
        : prevData.userSelectedServices.filter(s => s.name !== serviceName);
      
      return {
        ...prevData,
        userSelectedServices: updatedServices
      };
    });
  };

  const calculateTotal = (selectedServices) => {
    return selectedServices.reduce((sum, service) => {
      const price = parseFloat(service.price.replace('$', ''));
      return sum + price;
    }, 0).toFixed(2);
  };

  const sendConfirmationEmail = async (userData) => {
    // Format services as a simple array of names
    const servicesList = userData.userSelectedServices.map(service => service.name);
    
    const templateParams = {
      to_email: userData.email,
      to_name: userData.name,
      booking_ref: `BS${Date.now().toString().slice(-6)}`,
      booking_date: new Date(userData.date).toLocaleDateString(),
      phone: userData.phoneNumber,
      vehicle_no: userData.vehicleNumber,
      services: servicesList.join(', '), // Join services with commas
      total_price: `$${calculateTotal(userData.userSelectedServices)}`
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_NAME,
        import.meta.env.VITE_TEMPLATE_NAME,
        templateParams,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      );
      console.log("Booking confirmation email sent successfully");
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
      throw error;
    }
  };

  const ServiceItem = ({ service, onSelect }) => (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity" />
      <div className="relative flex flex-col rounded-lg backdrop-blur-sm bg-gray-800/50 border border-gray-700 p-4 hover:border-cyan-500 transition-all duration-300">
        <div className="flex items-center gap-4 mb-3">
          <Checkbox
            id={service.name}
            checked={service.serviceCheckBox}
            onCheckedChange={(checked) => onSelect(service.name, checked === true)}
            className="data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
          />
          <div className="relative h-12 w-12 transform group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-60" />
            <img
              src={service.imageUrl}
              alt={service.name}
              className="relative w-full h-full object-contain"
            />
          </div>
          <label htmlFor={service.name} className="text-gray-200 font-medium cursor-pointer group-hover:text-cyan-400 transition-colors flex-1">
            {service.name}
          </label>
        </div>
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-700/50">
          <span className="text-sm text-gray-400">{service.duration}</span>
          <span className="text-cyan-400 font-semibold">{service.price}</span>
        </div>
      </div>
    </div>
  );

  const PriceSummary = ({ selectedServices }) => {
    const total = selectedServices.reduce((sum, service) => {
      const price = parseFloat(service.price.replace('$', ''));
      return sum + price;
    }, 0);
  
    return (
      <div className="relative p-6 backdrop-blur-sm bg-gray-800/50 border border-gray-700 rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-xl opacity-10" />
        <div className="relative space-y-4">
          <h3 className="text-xl font-semibold text-white">Price Summary</h3>
          <div className="space-y-2">
            {selectedServices.map(service => (
              <div key={service.id} className="flex justify-between text-sm">
                <span className="text-gray-400">{service.name}</span>
                <span className="text-gray-300">{service.price}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-700">
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-white">Total</span>
              <span className="text-lg font-semibold text-cyan-400">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const UserInfoFields = () => (
    <div className="relative p-6 backdrop-blur-sm bg-gray-800/50 border border-gray-700 rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-xl opacity-10" />
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Type your name"
            value={userData.name}
            onChange={handleInputChange}
            required
            className="bg-gray-700/50 border-gray-600 focus:border-cyan-500 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Type your email"
            value={userData.email}
            onChange={handleInputChange}
            required
            className="bg-gray-700/50 border-gray-600 focus:border-cyan-500 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-gray-300">Phone Number</Label>
          <Input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Type your phone number"
            value={userData.phoneNumber}
            onChange={handleInputChange}
            required
            className="bg-gray-700/50 border-gray-600 focus:border-cyan-500 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vehicleNumber" className="text-gray-300">Vehicle Number</Label>
          <Input
            type="text"
            id="vehicleNumber"
            name="vehicleNumber"
            placeholder="ex: TN99R8855"
            value={userData.vehicleNumber}
            onChange={handleInputChange}
            required
            className="bg-gray-700/50 border-gray-600 focus:border-cyan-500 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date" className="text-gray-300">Date</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={userData.date}
            onChange={handleInputChange}
            required
            className="bg-gray-700/50 border-gray-600 focus:border-cyan-500 text-white placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  );

  const BookingForm = () => (
    <yourBookingContext.Consumer>
      {({ addBookingItem }) => {
        const handleSubmit = async (event) => {
          event.preventDefault();
          
          // Check if any services are selected using serviceData
          const selectedServices = serviceData.filter(service => service.serviceCheckBox);
          
          if (selectedServices.length === 0) {
            setBookingStatus("error");
            return;
          }

          try {
            // Add booking to context with selected services
            addBookingItem({
              ...userData,
              userSelectedServices: selectedServices
            });
            
            // Send confirmation email
            await sendConfirmationEmail({
              ...userData,
              userSelectedServices: selectedServices
            });
            
            setBookingStatus("success");
            setUserData(INITIAL_FORM_STATE);
            setServiceData(SERVICE_DATA_LIST.map(service => ({ 
              ...service, 
              serviceCheckBox: false 
            })));
            
            window.location = "/";
          } catch (error) {
            console.error("Booking failed:", error);
            setBookingStatus("error");
          }
        };

        return (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Personal Information
              </h3>
              <UserInfoFields />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Select Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceData.map((service) => (
                  <ServiceItem 
                    key={service.id} 
                    service={service} 
                    onSelect={handleServiceSelection} 
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <PriceSummary selectedServices={serviceData.filter(service => service.serviceCheckBox)} />
            </div>

            {bookingStatus && (
              <div className={`p-4 rounded-lg backdrop-blur-sm ${
                bookingStatus === "success" 
                  ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}>
                {bookingStatus === "success" 
                  ? "Booking Successful" 
                  : "*Please choose at least one service"}
              </div>
            )}

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-6 rounded-lg transition-all transform hover:scale-[1.02]"
            >
              Book Service
            </Button>
          </form>
        );
      }}
    </yourBookingContext.Consumer>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Header />
      
      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Book Your Service
            </h1>
            <p className="text-gray-400">
              Simply fill out the form below and we'll take care of your bike
            </p>
          </div>

          <BookingForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingService;