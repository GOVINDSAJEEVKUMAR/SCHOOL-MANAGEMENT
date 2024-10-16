const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Staff = require('../Model/Staff');
const worker = require('../Model/Librarian');
const books = require('../Model/Book');
const Student = require('../Model/Student');

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Admin Check
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const accessToken = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '5m' });
      const refreshToken = jwt.sign({ email, role: 'admin' }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
      
      // Set cookies
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 5 * 60 * 1000, // 5 minutes
        sameSite: 'strict',
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'strict',
      });

      return res.status(200).json({ role: 'admin', accessToken, refreshToken });
    }

    // Staff Check
    const staff = await Staff.findOne({ email });
    if (staff) {
      const isMatch = await bcrypt.compare(password, staff.password);
      if (isMatch) {
        const accessToken = jwt.sign({ email, role: staff.role }, process.env.JWT_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ email, role: staff.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // Set cookies
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1 * 60 * 1000, // 1 minute
          sameSite: 'strict',
        });
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          sameSite: 'strict',
        });

        return res.status(200).json({ role: staff.role, accessToken, refreshToken });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    // worker Check
    const Worker = await worker.findOne({ email });
if (!Worker) {
  return res.status(404).json({ message: 'Worker not found' });
}

if (!Worker.password) {
  return res.status(400).json({ message: 'Worker password is missing' });
}

const isMatch = await bcrypt.compare(password, Worker.password);
if (isMatch) {
  if (!Worker.role) {
    return res.status(400).json({ message: 'Worker role is missing' });
  }

  const accessToken = jwt.sign({ email, role: Worker.role }, process.env.JWT_SECRET, { expiresIn: '1m' });
  const refreshToken = jwt.sign({ email, role: Worker.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  // Set cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1 * 60 * 1000, // 1 minute
    sameSite: 'strict',
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'strict',
  });

  return res.status(200).json({ role: Worker.role, accessToken, refreshToken });
} else {
  return res.status(401).json({ message: 'Invalid credentials' });
}


    return res.status(404).json({ message: "User not found" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const Logout = (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const getCount = async (req, res) => {
  try {
    const [staffCount, workerCount, bookCount, studentCount] = await Promise.all([
      Staff.countDocuments(),
      worker.countDocuments(),
      books.countDocuments(),
      Student.countDocuments(),
    ]);

    return res.status(200).json({
      staff: staffCount,
      workers: workerCount,
      books: bookCount,
      students: studentCount,
    });
  } catch (error) {
    console.error('Error getting counts:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { Login, Logout,getCount };
