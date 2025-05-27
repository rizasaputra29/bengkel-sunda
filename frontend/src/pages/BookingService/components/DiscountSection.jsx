import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DiscountSection = ({
  discountCode,
  discountError,
  handleApplyDiscount,
  setDiscountCode,
  commonStyles,
}) => {
  return (
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
    </div>
  );
};

export default DiscountSection;