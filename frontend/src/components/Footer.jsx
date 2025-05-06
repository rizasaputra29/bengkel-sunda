const Footer = () => {
  return (
    <footer className="relative mt-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-gray-900/50" />

      <div className="relative border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold bg-clip-text bg-gradient-to-r text-white">
                Bengkel Sunda
              </h3>
              <p className="text-gray-400 text-sm max-w-md">
                Professional bike service and maintenance. We provide expert care for your ride.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white bg-clip-text bg-gradient-to-r ">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {["Home", "Services", "About", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-gray-400 transition-colors text-sm"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white bg-clip-text bg-gradient-to-r">
                Contact Us
              </h3>
              <div className="space-y-2">
                <a
                  href="tel:+1234567890"
                  className="flex items-center space-x-2 text-gray-400 hover:text-gray-400 transition-colors group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gray-400/20 rounded-full blur group-hover:bg-gray-400/30 transition-colors" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 relative"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 5h2l3.6 7.59-1.35 2.44a11.05 11.05 0 005.4 5.4l2.44-1.35L19 19v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                    </svg>
                  </div>
                  <span className="text-sm">+1 234 567 890</span>
                </a>
                <a
                  href="mailto:contact@bikeservice.com"
                  className="flex items-center space-x-2 text-gray-400 hover:text-gray-400 transition-colors group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gray-400/20 rounded-full blur group-hover:bg-gray-400/30 transition-colors" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 relative"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm">contact@bikeservice.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center space-y-4 pt-8">

            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © 2024 Bengkel Sunda. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;