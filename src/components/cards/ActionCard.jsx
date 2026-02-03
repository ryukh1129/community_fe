function ActionCard({title, text, buttonText, onButtonClick, buttonVariant = 'primary'}) {
    const buttonStyles = {
        primary: 'bg-blue-500 hover:bg-blue-700',
        success: 'bg-green-500 hover:bg-green-700',
        danger: 'bg-red-500 hover:bg-red-700',
        secondary: 'bg-gray-500 hover:bg-gray-700',
    };

    const buttonClass = `w-full px-4 py-4 text-white rounded-lg ${buttonStyles[buttonVariant] || buttonStyles['primary']}`

    return (
        <div>
            <h2>관리자 대시보드</h2>
            <p>게시판 생성 및 사이트 설정</p>

            <div>
                <h5>{title}</h5>
                <p>{text}</p>
                <button onClick = {onButtonClick} className={`mt-4 ${buttonClass}`}>{buttonText}</button>
            </div>
        </div>
    )    
}

export default ActionCard;