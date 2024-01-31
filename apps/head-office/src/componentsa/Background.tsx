interface BackgroundProps {
    className?: string,
    backgroundUrl: string
}

const Background = ({ className, backgroundUrl }: BackgroundProps) => {
    return (
        <div
            className={`${className}`}
            style={{ backgroundImage: `url("${backgroundUrl}")`}}
        >
        </div>
    )
}

export default Background