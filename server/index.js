const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Ping.." });
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://hooklogic.onrender.com",
    "https://hooklogic.vercel.app/contact",
    "https://hooklogic.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Important when deployed (Vercel / Render / Nginx etc)
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
  ipAddress: String,
  location: String,
  submittedAt: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

/* ================= EMAIL ================= */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // IMPORTANT for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});


/* ================= ROUTE ================= */

app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    /* ===== VALIDATION ===== */

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields are required"
      });
    }

    const emailRegex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format"
      });
    }

    /* ===== GET REAL IP ===== */

    let ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket.remoteAddress ||
      "";

    // Clean IPv6 prefix
    if (ip.includes("::ffff:")) {
      ip = ip.split("::ffff:")[1];
    }

    // If localhost, don't fetch geo
    let location = "Localhost (Development)";

    if (ip !== "127.0.0.1" && ip !== "::1") {
      try {
        const geo = await axios.get(`http://ip-api.com/json/${ip}`);
        if (geo.data.status === "success") {
          location = `${geo.data.city}, ${geo.data.regionName}, ${geo.data.country}`;
        }
      } catch (geoError) {
        console.log("Geo Error:", geoError.message);
        location = "Location unavailable";
      }
    }

    /* ===== TIME ===== */

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN");
    const formattedTime = now.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata"
    });
    const submittedAt = `${formattedDate} ${formattedTime} IST`;

    /* ===== SAVE TO DATABASE ===== */

    await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      ipAddress: ip,
      location,
      submittedAt
    });

    /* ===== SEND PROFESSIONAL EMAIL ===== */

    await transporter.sendMail({
      from: `"HookLogic Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `📩 New Contact Request - ${subject}`,
      html: `
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

<!-- HEADER -->
<tr>
<td align="center" style="background:linear-gradient(90deg,#0ea5e9,#2563eb);padding:20px;color:#ffffff;">
<h2 style="margin:0;font-size:22px;">New Website Contact</h2>
<p style="margin:5px 0 0;font-size:13px;">HookLogic Contact Form Submission</p>
</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:25px;">

<table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;">

<tr>
<td width="35%" style="font-weight:bold;color:#333;">Name</td>
<td style="color:#555;word-break:break-word;">${name}</td>
</tr>

<tr style="background:#f9fafb;">
<td style="font-weight:bold;color:#333;">Email</td>
<td style="color:#555;word-break:break-word;">${email}</td>
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
<td style="font-weight:bold;color:#333;">IP Address</td>
<td style="color:#555;">${ip}</td>
</tr>

<tr style="background:#f9fafb;">
<td style="font-weight:bold;color:#333;">Location</td>
<td style="color:#555;">${location}</td>
</tr>

<tr>
<td style="font-weight:bold;color:#333;">Submitted At</td>
<td style="color:#555;">${submittedAt}</td>
</tr>

</table>

<!-- MESSAGE -->
<div style="margin-top:20px;">
<h3 style="margin-bottom:10px;color:#333;">Message</h3>
<div style="background:#f3f4f6;padding:15px;border-radius:8px;line-height:1.6;color:#444;word-break:break-word;">
${message}
</div>
</div>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td align="center" style="background:#f1f5f9;padding:15px;font-size:12px;color:#666;">
This email was automatically generated from HookLogic website.
<br>
© ${new Date().getFullYear()} HookLogic
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`
    });

    res.json({ success: true });

  } catch (error) {
    console.log("EMAIL ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/* ================= START SERVER ================= */

app.listen(5000, () =>
  console.log("Server running on port 5000")
);
