import { Button } from "@/components/ui/button";
import yourBookingContext from "../../../context/yourBookingContext";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserInfoFields from "./UserInfoFields";
import ServiceItem from "./ServiceItem";
import PriceSummary from "./PriceSummary";
import DiscountSection from "./DiscountSection";

const BookingForm = ({
  serviceData,
  userData,
  bookingStatus,
  formError,
  discountCode,
  discountAmount,
  discountError,
  validDiscountCodes,
  INITIAL_FORM_STATE,
  SERVICE_DATA_LIST,
  commonStyles,
  handleInputChange,
  handleServiceSelection,
  calculateTotal,
  calculateTotalWithDiscount,
  setUserData,
  setServiceData,
  setBookingStatus,
  setFormError,
  setDiscountCode,
  setDiscountAmount,
  setDiscountError,
}) => {
  const navigate = useNavigate();

  const sendConfirmationEmail = async (userData, selectedServices, totalBeforeDiscount, totalAfterDiscount) => {
    try {
      // Format date
      const formattedDate = new Date(userData.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Prepare template parameters
      const templateParams = {
        customer_name: userData.name,
        customer_email: userData.email,
        customer_phone: userData.phoneNumber,
        vehicle_number: userData.vehicleNumber,
        booking_date: formattedDate,
        booking_ref: `BS${Date.now().toString().slice(-6)}`,
        services_list: selectedServices
          .map((service) => `${service.name} (${service.duration}) - ${service.price}`)
          .join('\n'),
        total_before_discount: totalBeforeDiscount,
        total_after_discount: totalAfterDiscount,
      };

      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_SERVICE_NAME,
        import.meta.env.VITE_TEMPLATE_NAME,
        templateParams,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      );

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      throw error;
    }
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

  return (
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
            const totalBeforeDiscount = calculateTotal(selectedServices);
            const totalAfterDiscount = calculateTotalWithDiscount(selectedServices);

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
            await sendConfirmationEmail(
              userData,
              selectedServices,
              totalBeforeDiscount,
              totalAfterDiscount
            );

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
              <UserInfoFields
                userData={userData}
                handleInputChange={handleInputChange}
                commonStyles={commonStyles}
              />
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
                    commonStyles={commonStyles}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <DiscountSection
                discountCode={discountCode}
                discountError={discountError}
                handleApplyDiscount={handleApplyDiscount}
                setDiscountCode={setDiscountCode}
                commonStyles={commonStyles}
              />
            </div>

            <div className="space-y-6">
              <PriceSummary
                selectedServices={serviceData.filter(
                  (service) => service.serviceCheckBox
                )}
                calculateTotal={calculateTotal}
                calculateTotalWithDiscount={calculateTotalWithDiscount}
                discountAmount={discountAmount}
                commonStyles={commonStyles}
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
};

export default BookingForm;