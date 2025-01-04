import { FormEvent, useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUpdateUser } from "./useUpdateUser";

const UpdateUserNameForm: React.FC = () => {
  const [formData, setFormData] = useState<{ name: string }>({
    name: "",
  });

  const { updateUser, isUpdatingUser } = useUpdateUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(formData);

    updateUser(formData);

    setFormData({
      name: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <h2 className="text-lg font-extrabold">Update Name</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-md bg-white bg-opacity-90 p-6 rounded-md shadow-xl backdrop-blur-lg  mx-4 md:mx-0"
      >
        <div className="flex flex-col w-full gap-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-bold text-gray-700"
            >
              Name
            </label>
            <input
              className="w-full h-8 md:h-10 px-4 rounded-md border focus:border-[#B97743] focus:outline-none shadow-sm text-gray-700"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-8 md:h-10 flex justify-center items-center bg-gray-800 text-white rounded-md shadow-md"
          disabled={isUpdatingUser}
        >
          {isUpdatingUser ? <SpinnerMini /> : "Update Name"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUserNameForm;
