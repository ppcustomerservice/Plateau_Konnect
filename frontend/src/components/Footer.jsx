import { memo } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const Footer = memo(() => {
  const date = new Date();

  return (
    <footer className="bg-black text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact Us Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p className="flex items-center text-sm">
            <FaMapMarkerAlt className="mr-2" />
            <a
              href="https://goo.gl/maps/Mj7pR5H5zRD2"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              5/12A Calangute Beach, Bardez, Goa - 403516
            </a>
          </p>
          <p className="flex items-center text-sm mt-2 text-gray-500">
            <FaPhoneAlt className="mr-2" />
            <a href="tel:+919156091640" className="hover:underline">
              +91 9156091640
            </a>
          </p>
          <p className="flex items-center text-sm mt-2 text-gray-500">
            <FaEnvelope className="mr-2" />
            <a
              href="mailto:customerservice@propertyplateau.com"
              className="hover:underline"
            >
              customerservice@propertyplateau.com
            </a>
          </p>
          <p className="flex items-center text-sm mt-2">
            <FaGlobe className="mr-2" />
            <a
              href="https://www.propertyplateau.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Property Plateau
            </a>
          </p>

          {/* Social Media & WhatsApp Links */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/profile.php?id=100087645195912"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black text-white rounded-full cursor-pointer hover:bg-green-700"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/company/propertyplateau-realty/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black text-white rounded-full cursor-pointer hover:bg-green-700"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.instagram.com/property_plateau?igsh=em1oY3hzM2g3aGpw"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black text-white rounded-full cursor-pointer hover:bg-green-700"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/919156091640"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black text-white rounded-full cursor-pointer hover:bg-green-700"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://youtube.com/@propertyplateaurealty?si=TUZgLtX5yc0Gn5A-"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black text-white rounded-full cursor-pointer hover:bg-red-600"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.propertyplateau.com/property_category/apartments/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Rentals
              </a>
            </li>
            <li>
              <a
                href="https://www.propertyplateau.com/property_category/apartments/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Sales
              </a>
            </li>
            <li>
              <a
                href="https://www.propertyplateau.com/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="https://www.propertyplateautimes.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Our Blog
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm mt-6">
        <p>
          All Rights Reserved &copy; {date.getFullYear()} Property Plateau
          Private Ltd.
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
