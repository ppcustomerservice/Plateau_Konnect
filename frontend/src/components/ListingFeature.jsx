
const ListingFeature = ({ Icon, label, value }) => {
  return (
    <div className="flex items-center gap-4 bg-blue-50 border p-4 transition-all duration-300 hover:bg-blue-100 hover:shadow-md cursor-pointer rounded-lg">
      {/* Icon */}
      <Icon className="h-6 w-6 text-gray-700" />
      
      {/* Text Content */}
      <span className="text-gray-700 text-sm sm:text-base font-medium">
        {label}: <span className="font-bold text-gray-900">{value}</span>
      </span>
    </div>
  );
};

export default ListingFeature;