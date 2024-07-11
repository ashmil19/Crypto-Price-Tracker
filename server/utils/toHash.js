import bcrypt from 'bcrypt'

export default async (value) => {
  try {
    const hashed = await bcrypt.hash(value, 10);
    return hashed;
  } catch (error) {
    console.log(error.message);
  }
};