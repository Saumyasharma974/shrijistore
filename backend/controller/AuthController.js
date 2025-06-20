import User from "../models/User.model.js"; 
import bcrypt from 'bcryptjs'; // Make sure to install bcryptjs

async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

    

        // Hash the password before saving (you should use a library like bcrypt for this)
        // Note: In a real application, you should hash the password before saving it to the database.
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashpassword });
        await newUser.save();

        // Send success response
        res.status(201).json({ message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
         });
    } catch (err) {
        console.error('Error in register:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}





async function Login(req,res){

    try{
      
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:'All fields are required'});
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) { 
        return res.status(400).json({ message: 'User does not exist' });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    // If everything is okay, you can send a success response
    res.status(200).json({ message: 'Login successful', user: { id: user._id, email: user.email } });
}
    catch(err){
        console.error('Error in login:', err.message);
        res.status(500).json({ message: 'Error in Login' });
    }
}

export { register, Login };
