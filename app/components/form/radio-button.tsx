export const RadioItem = ({ id, name, value, label, defaultChecked, onChange }: { id: string, name: string, value: string, label: string, defaultChecked: boolean, onChange?: () => void }) => {
    return (
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
                <input
                    id={id}
                    type="radio"
                    value={value}
                    name={name}
                    defaultChecked={defaultChecked}
                    onChange={onChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label htmlFor={id} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {label}
                </label>
            </div>
        </li>
    );
};

