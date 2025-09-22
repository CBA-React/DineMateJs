import { SubmitButton } from "/src/components/ui/SubmitButton"

const SuccessWindow = ({title, subtitle, successButtonText, onContinue}) => {
    return (
        <>
            <h1 className="text-center text-4xl md:text-5xl font-medium font-serif mb-3">{title}</h1>
            <h2 className="text-center md:text-[20px] font-normal tracking-[1px] mb-5 md:mb-10">{subtitle}</h2>
            <SubmitButton onClick={onContinue} text={successButtonText} withIcon/>
        </>
    )
}

export default SuccessWindow;