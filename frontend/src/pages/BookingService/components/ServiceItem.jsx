import { Checkbox } from "@/components/ui/checkbox";

const ServiceItem = ({ service, onSelect, commonStyles }) => {
  return (
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
};

export default ServiceItem;