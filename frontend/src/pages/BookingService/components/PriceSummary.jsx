const PriceSummary = ({
  selectedServices,
  calculateTotal,
  calculateTotalWithDiscount,
  discountAmount,
  commonStyles,
}) => {
  const totalBeforeDiscount = calculateTotal(selectedServices);
  const totalAfterDiscount = calculateTotalWithDiscount(selectedServices);

  return (
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
        {discountAmount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount Applied</span>
            <span>{(discountAmount * 100).toFixed(0)}%</span>
          </div>
        )}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-800">
              Total Before Discount
            </span>
            <span className="text-lg font-semibold text-gray-800">
              {totalBeforeDiscount}
            </span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-lg font-semibold text-gray-800">
                Total After Discount
              </span>
              <span className="text-lg font-semibold text-red-600">
                {totalAfterDiscount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;