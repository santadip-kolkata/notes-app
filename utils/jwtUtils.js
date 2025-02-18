const bcrypt = require('bcrypt');

// Utility function to hash the password
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // The number of salt rounds (higher is more secure)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
};

// Utility function to compare entered password with the stored hash
const comparePassword = async (enteredPassword, storedHash) => {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, storedHash);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords: ' + error.message);
  }
};

module.exports = { hashPassword, comparePassword };
