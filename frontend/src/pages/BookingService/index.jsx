import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import yourBookingContext from "../../context/yourBookingContext";
import { SERVICE_DATA_LIST } from "@/data/services";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BookingForm from "./components/BookingForm";

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
  const [formError, setFormError] = useState("");

  // Add state for discount
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const validDiscountCodes = {
    SPRING25: 0.15, // 15% discount
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

  // Props to pass to BookingForm
  const bookingFormProps = {
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
    handleApplyDiscount,
    setUserData,
    setServiceData,
    setBookingStatus,
    setFormError,
    setDiscountCode,
    setDiscountAmount,
    setDiscountError,
  };

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

          <BookingForm {...bookingFormProps} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingService;