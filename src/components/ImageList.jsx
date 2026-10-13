
import * as motion from "motion/react-client"

const ImageList = () => {
    const box = {
        width: 100,
        height: 100,
        backgroundColor: "yellow",
        borderRadius: 10,
        cursor: "pointer",
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <motion.div
                style={box}
                whileTap={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
            />
        </div>
    )
}

export default ImageList
