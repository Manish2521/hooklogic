import React, { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid phone number (10–15 digits)";
    }

    if (!formData.subject.trim())
      newErrors.subject = "Subject is required";

    if (!formData.message.trim())
      newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://hooklogic.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputStyle = (field: keyof FormErrors) =>
    `w-full px-4 py-3 bg-slate-800/50 rounded-lg border ${
      errors[field] ? "border-red-500" : "border-slate-700"
    } focus:border-blue-400 focus:outline-none transition-colors`;

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-gray-300">
            Ready to transform your ideas into reality? Get in touch and let's discuss your next project.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: <Phone size={24} />, title: "Phone", info: "+91 98765 43210" },
            { icon: <Mail size={24} />, title: "Email", info: "contact@hooklogic.com" },
            { icon: <MapPin size={24} />, title: "Location", info: "New Delhi, India" },
          ].map((item, index) => (
            <div key={index} className="bg-slate-800/30 p-6 rounded-lg text-center">
              <div className="text-blue-400 mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.info}</p>
            </div>
          ))}
        </div>

        {/* Map + Form */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">

          {/* Map */}
          <div className="h-[400px] rounded-xl overflow-hidden">
            <MapContainer
              center={[28.6139, 77.2090]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={[28.6139, 77.2090]}>
                <Popup>
                  HookLogic Office <br /> New Delhi, India
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputStyle("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputStyle("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputStyle("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={inputStyle("subject")}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Message *
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={inputStyle("message")}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting
                ? "Sending..."
                : submitSuccess
                ? "Message Sent!"
                : (
                  <>
                    Send Message
                    <ArrowRight />
                  </>
                )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
