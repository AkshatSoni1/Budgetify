
const ProgressBar = (props) => {
    const { varient, min, max, percentage } = props;

    // Gives a valid value between 0 - 100 %
    const validValue = Math.max(min, Math.min(max, percentage));

    return (
        <div className="w-full bg-white rounded-full h-2.5 shadow-sm shadow-gray-900">
            <div
                className={`${varient === "primary" ? "bg-blue-500" : varient === "warning" ? "bg-yellow-500" : "bg-red-500"} h-2.5 rounded-full`}
                style={{ width: `${validValue}%` }}
            ></div>
        </div>
    )
}

export default ProgressBar
