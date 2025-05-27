import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const UserInfoFields = ({ userData, handleInputChange, commonStyles }) => {
  return (
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
            type="number"
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
};

export default UserInfoFields;