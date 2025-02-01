import jwt from "jsonwebtoken"

// admin authentication 

const authAdmin = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.json({ success: false, message: 'Not Authorized Login Again' });
        }

        const decode_token = jwt.verify(token, process.env.JWT_SECRET)

        if (decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return es.json({ success: false, message: 'Not Authorized Login Again' })
        }
        
        next()

    } catch (error) {
        console.log("authAdmin Error: ", error)
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin