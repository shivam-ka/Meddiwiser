import jwt from "jsonwebtoken"

// user authentication 
const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' });
        }

        const decode_token = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.body.docId = decode_token.id

        next()

    } catch (error) {
        console.log("authDoctor Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

export default authDoctor