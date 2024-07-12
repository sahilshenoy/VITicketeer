import { NextApiRequest, NextApiResponse } from 'next';

const preSignupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email_address } = req.body;

  if (!email_address.endsWith("@vitbhopal.ac.in")) {
    console.warn("Access denied for email:", email_address);
    return res.status(403).json({ error: "Access Denied: Only VIT Bhopal email addresses are allowed." });
  }

  // If the email is valid, allow the signup process to continue
  return res.status(200).json({ message: "Email is valid" });
};

export default preSignupHandler;
