import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import yourBookingContext from "../../context/yourBookingContext";
import emailjs from "@emailjs/browser";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SERVICE_DATA_LIST } from "@/data/services";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const commonStyles = {
  container: "bg-white rounded-3xl p-8 border border-gray-200 shadow-sm",
  heading: "text-4xl md:text-5xl font-bold text-black",
  accent: "text-red-600",
  text: "text-gray-700",
  input:
    "bg-white border-gray-200 rounded-xl focus:border-red-500 text-gray-800",
  button: "bg-red-600 hover:bg-red-700 text-white font-medium",
};

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
    SERVICE_DATA_LIST.map((service) => ({ ...service, serviceCheckBox: false }))
  );

  const [userData, setUserData] = useState(INITIAL_FORM_STATE);
  const [bookingStatus, setBookingStatus] = useState("");
  const [formError, setFormError] = useState(""); // Add this state for form validation errors
  const navigate = useNavigate();

  // Add state for discount
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const validDiscountCodes = {
    SPRING25: 0.15, // 15% discount
  };

  const handleApplyDiscount = () => {
    if (validDiscountCodes[discountCode]) {
      setDiscountAmount(validDiscountCodes[discountCode]);
      setDiscountError("");
    } else {
      setDiscountError("Invalid discount code. Please try again.");
      setDiscountAmount(0);
    }
  };

  const calculateTotalWithDiscount = (selectedServices) => {
    const total = calculateTotal(selectedServices);
    const totalWithoutCurrency = parseFloat(total.replace(/[^\d]/g, ""));
    const discountedTotal = totalWithoutCurrency * (1 - discountAmount);
    return discountedTotal.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Reset form error when services are selected
  useEffect(() => {
    if (userData.userSelectedServices.length > 0) {
      setFormError("");
    }
  }, [userData.userSelectedServices]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleServiceSelection = (serviceName, isChecked) => {
    // Update serviceData state
    setServiceData((prevServices) =>
      prevServices.map((service) =>
        service.name === serviceName
          ? { ...service, serviceCheckBox: isChecked }
          : service
      )
    );

    // Update userData with the correct approach
    const selectedService = serviceData.find((s) => s.name === serviceName);

    setUserData((prevData) => {
      if (isChecked) {
        return {
          ...prevData,
          userSelectedServices: [
            ...prevData.userSelectedServices,
            selectedService,
          ],
        };
      } else {
        return {
          ...prevData,
          userSelectedServices: prevData.userSelectedServices.filter(
            (s) => s.name !== serviceName
          ),
        };
      }
    });
  };

  const calculateTotal = (selectedServices) => {
    return selectedServices
      .reduce((sum, service) => {
        // Remove 'Rp' and '.' from price string and convert to number
        const price = parseFloat(
          service.price
            .replace('Rp', '')
            .replace(/\./g, '')
        );
        return sum + price;
      }, 0)
      .toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
  };

  const sendConfirmationEmail = async (userData) => {
    try {
      // Prepare services data
      const servicesData = userData.userSelectedServices.map(service => ({
        name: service.name,
        price: service.price,
        duration: service.duration
      }));

      // Format date
      const formattedDate = new Date(userData.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Prepare template parameters
      const templateParams = {
        // Customer Info
        customer_name: userData.name,
        customer_email: userData.email,
        customer_phone: userData.phoneNumber,
        vehicle_number: userData.vehicleNumber,
        booking_date: formattedDate,
        
        // Booking Reference
        booking_ref: `BS${Date.now().toString().slice(-6)}`,
        
        // Services (as string)
        services_list: userData.userSelectedServices
          .map(service => `${service.name} (${service.duration}) - ${service.price}`)
          .join('\n'),
          
        // Total Amount
        total_amount: `${calculateTotal(userData.userSelectedServices)}`
      };

      const response = await emailjs.send(
        import.meta.env.VITE_SERVICE_NAME,
        import.meta.env.VITE_TEMPLATE_NAME,
        templateParams,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      );

      console.log('Email sent successfully:', response);
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      throw error;
    }
  };

  const ServiceItem = ({ service, onSelect }) => (
    <div className={`${commonStyles.container} relative group`}>
      <div className="flex items-center gap-4">
        <Checkbox
          id={service.name}
          checked={service.serviceCheckBox}
          onCheckedChange={(checked) => {
            console.log("Service selected:", service.name, checked);
            onSelect(service.name, checked === true);
          }}
          className="
          h-5 
          w-5 
          border-2 
          border-red-600
          rounded
          bg-white 
          data-[state=checked]:bg-white
          data-[state=checked]:border-red-600
          focus:ring-red-600
          focus:ring-2
          focus:ring-offset-2
          transition-colors
          cursor-pointer
        "
        />
        <div className="relative h-12 w-12 transform group-hover:scale-110 transition-transform duration-300">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-full object-contain"
          />
        </div>
        <label
          htmlFor={service.name}
          className="text-gray-800 font-medium cursor-pointer group-hover:text-red-600 transition-colors flex-1"
        >
          {service.name}
        </label>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-600">{service.duration}</span>
        <span className="text-lg font-bold text-red-600">{service.price}</span>
      </div>
    </div>
  );

  const DiscountSection = () => (
    <div className={commonStyles.container}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Apply Discount Code
      </h3>
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Enter discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className={commonStyles.input}
        />
        <Button
          type="button"
          onClick={handleApplyDiscount}
          className={`${commonStyles.button} py-3 px-6`}
        >
          Apply
        </Button>
      </div>
      {discountError && (
        <p className="text-red-600 mt-2 text-sm">{discountError}</p>
      )}
      {discountAmount > 0 && (
        <p className="text-green-600 mt-2 text-sm">
          Discount applied: {discountAmount * 100}%
        </p>
      )}
    </div>
  );

  const PriceSummary = ({ selectedServices }) => (
    <div className={commonStyles.container}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Price Summary
      </h3>
      <div className="space-y-2">
        {selectedServices.length > 0 ? (
          selectedServices.map((service) => (
            <div key={service.id} className="flex justify-between text-sm">
              <span className="text-gray-600">{service.name}</span>
              <span className="text-gray-800">{service.price}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No services selected</p>
        )}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-800">Total</span>
            <span className="text-lg font-semibold text-red-600">
              {selectedServices.length > 0
                ? calculateTotalWithDiscount(selectedServices)
                : "Rp0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const UserInfoFields = () => (
    <div className={commonStyles.container}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Type your name"
            value={userData.name}
            onChange={handleInputChange}
            required
            className={commonStyles.input}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Type your email"
            value={userData.email}
            onChange={handleInputChange}
            required
            className={commonStyles.input}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-gray-700">
            Phone Number
          </Label>
          <Input
            type="tel" // Changed from "number" to "tel" for better UX
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Type your phone number"
            value={userData.phoneNumber}
            onChange={handleInputChange}
            required
            className={commonStyles.input}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vehicleNumber" className="text-gray-700">
            Vehicle Number
          </Label>
          <Input
            type="text"
            id="vehicleNumber"
            name="vehicleNumber"
            placeholder="ex: H 3001 PF"
            value={userData.vehicleNumber}
            onChange={handleInputChange}
            required
            className={commonStyles.input}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date" className="text-gray-700">
            Date
          </Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={userData.date}
            onChange={handleInputChange}
            required
            className={commonStyles.input}
          />
        </div>
      </div>
    </div>
  );

  const BookingForm = () => (
    <yourBookingContext.Consumer>
      {({ addBookingItem }) => {
        const validateForm = () => {
          // Check if any services are selected
          const selectedServices = serviceData.filter(
            (service) => service.serviceCheckBox
          );
          
          if (selectedServices.length === 0) {
            setFormError("Please choose at least one service");
            return false;
          }
          
          // Basic validation for required fields
          if (!userData.name || !userData.email || !userData.phoneNumber || 
              !userData.vehicleNumber || !userData.date) {
            setFormError("Please fill in all required fields");
            return false;
          }
          
          return true;
        };

        const handleSubmit = async (event) => {
          event.preventDefault();
          
          // Reset error states
          setFormError("");
          setBookingStatus("");
          
          // Validate form before submission
          if (!validateForm()) {
            return;
          }

          const selectedServices = serviceData.filter(
            (service) => service.serviceCheckBox
          );

          try {
            const token = localStorage.getItem("token");
            if (!token) {
              navigate("/login");
              return;
            }

            // Calculate total
            const totalPrice = parseFloat(calculateTotalWithDiscount(selectedServices).replace(/[^\d]/g, ""));

            // Data to send to backend
            const bookingData = {
              name: userData.name,
              email: userData.email,
              phoneNumber: userData.phoneNumber,
              vehicleNumber: userData.vehicleNumber,
              date: userData.date,
              services: selectedServices.map((service) => ({
                name: service.name,
                price: service.price,
                duration: service.duration,
              })),
              totalPrice,
            };

            // Send data to API
            const response = await axios.post(
              "http://localhost:5002/api/bookings",
              bookingData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            // Update context
            addBookingItem(bookingData);

            // Send confirmation email
            await sendConfirmationEmail({
              ...userData,
              userSelectedServices: selectedServices,
            });

            setBookingStatus("success");
            setUserData(INITIAL_FORM_STATE);
            setServiceData(
              SERVICE_DATA_LIST.map((service) => ({
                ...service,
                serviceCheckBox: false,
              }))
            );

            // Redirect to home page
            window.location = "/";
          } catch (error) {
            console.error("Booking failed:", error);
            setBookingStatus("error");
            setFormError("An error occurred while processing your booking. Please try again.");
          }
        };

        return (
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Personal Information
              </h3>
              <UserInfoFields />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">
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
              <DiscountSection />
            </div>

            <div className="space-y-6">
              <PriceSummary
                selectedServices={serviceData.filter(
                  (service) => service.serviceCheckBox
                )}
              />
            </div>

            {bookingStatus === "success" && (
              <div className="p-4 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
                Booking Successful
              </div>
            )}
            
            {(formError || bookingStatus === "error") && (
              <div className="p-4 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                {formError || "An error occurred. Please try again."}
              </div>
            )}

            <Button
              type="submit"
              className={`${commonStyles.button} w-full py-6 rounded-lg transition-all transform hover:scale-[1.02]`}
            >
              Book Service
            </Button>
          </form>
        );
      }}
    </yourBookingContext.Consumer>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      <Header />

      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/services"
            className="inline-flex items-center text-gray-600 hover:text-red-600 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>

          <div className="text-center space-y-4 mb-12">
            <h1 className={commonStyles.heading}>
              Book Your <span className={commonStyles.accent}>Service</span>
            </h1>
            <p className={commonStyles.text}>
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