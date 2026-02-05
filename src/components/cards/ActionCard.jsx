function ActionCard({title, text, buttonText, onButtonClick, buttonVariant = 'primary'}) {
    const buttonStyles = {
        primary: 'bg-blue-500 hover:bg-blue-700',
        success: 'bg-green-600 hover:bg-green-700',
        danger: 'bg-red-600 hover:bg-red-700',
        secondary: 'bg-gray-600 hover:bg-gray-700',
    };

    const buttonClass = `w-full px-4 py-3 text-white font-medium rounded-lg transition-colors duration-200 ${buttonStyles[buttonVariant] || buttonStyles['primary']}`;

    return (
        <div className="flex flex-col h-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="p-6 flex-grow">
                <h5 className="text-xl font-bold text-gray-900 mb-2">
                    {title}
                </h5>
                <p className="text-gray-600 leading-relaxed">
                    {text}
                </p>
            </div>

            <div className="p-6 pt-0 mt-auto">
                <button 
                    onClick={onButtonClick} 
                    className={buttonClass}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default ActionCard;