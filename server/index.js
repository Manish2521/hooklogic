const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* ================= BASIC ================= */

app.get("/", (req, res) => {
  res.json({ message: "Ping.." });
});

/* ================= CORS ================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://hooklogic.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS blocked"));
  },
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.set('trust proxy', true);

/* ================= MONGODB ================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  submittedAt: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

/* ================= EMAIL ================= */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});

/* ================= ROUTE ================= */

app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    /* ===== VALIDATION ===== */

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Invalid email format" });
    }

    /* ===== TIME ===== */

    const now = new Date();
    const submittedAt =
      now.toLocaleDateString("en-IN") + " " +
      now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST";

    /* ===== SAVE DB ===== */

    await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      submittedAt
    });

    /* ===== EMAIL TEMPLATE ===== */

    const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;background:#f4f6f8;">
<tr>
<td align="center">

<table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.08);">

<tr>
<td align="center" style="background:linear-gradient(90deg,#0ea5e9,#2563eb);padding:20px;color:#ffffff;">
<h2 style="margin:0;font-size:22px;">New Website Contact</h2>
<p style="margin:5px 0 0;font-size:13px;">HookLogic Contact Form Submission</p>
</td>
</tr>

<tr>
<td style="padding:25px;">

<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;">

<tr>
<td width="35%" style="font-weight:bold;color:#333;">Name</td>
<td style="color:#555;">${name}</td>
</tr>

<tr style="background:#f9fafb;">
<td style="font-weight:bold;color:#333;">Email</td>
<td style="color:#555;">${email}</td>
</tr>

<tr>
<td style="font-weight:bold;color:#333;">Phone</td>
<td style="color:#555;">${phone}</td>
</tr>

<tr style="background:#f9fafb;">
<td style="font-weight:bold;color:#333;">Subject</td>
<td style="color:#555;">${subject}</td>
</tr>

<tr>
<td style="font-weight:bold;color:#333;">Submitted At</td>
<td style="color:#555;">${submittedAt}</td>
</tr>

</table>

<div style="margin-top:20px;">
<h3 style="margin-bottom:10px;color:#333;">Message</h3>
<div style="background:#f3f4f6;padding:15px;border-radius:8px;line-height:1.6;color:#444;">
${message}
</div>
</div>

</td>
</tr>

<tr>
<td align="center" style="background:#f1f5f9;padding:15px;font-size:12px;color:#666;">
This email was automatically generated from HookLogic website.<br>
© ${new Date().getFullYear()} HookLogic
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

    /* ===== RESPOND IMMEDIATELY ===== */

    res.status(200).json({ success: true });

    /* ===== SEND EMAIL IN BACKGROUND ===== */

    process.nextTick(() => {
      transporter.sendMail({
        from: `"HookLogic Website" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `📩 New Contact Request - ${subject}`,
        html: emailTemplate
      })
      .then(() => console.log("Email sent"))
      .catch(err => console.log("Email failed:", err.message));
    });

  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

/* ================= START ================= */

app.listen(5000, () => console.log("Server running on port 5000"));
