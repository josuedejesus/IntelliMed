import "../styles.css";

const Footer = () => {
  return (
    <footer class="bg-white shadow bg-blue-200">
      <div className="w-full mx-auto max-w-screen-xl p-4">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 UNITEC™. All Rights Reserved.
          </span>
       
        
        <div className="md:flex md:justify-between">
          
          <div className="mb-6 md:mb-0">
            <h5 className="text-lg font-bold text-gray-700">Recursos utilizados</h5>
            <ul className="text-sm text-gray-500 mt-2">
              <li><a href="#" className="hover:underline">Company Info</a></li>
              <li><a href="#" className="hover:underline">Our Mission</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
            </ul>
          </div>

          <div className="mb-6 md:mb-0">
            <h5 className="text-lg font-bold text-gray-700">Hospitales</h5>
            <ul className="text-sm text-gray-500 mt-2">
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Data Protection</a></li>
              <li><a href="#" className="hover:underline">Cookie Policy</a></li>
            </ul>
          </div>

          <div className="mb-6 md:mb-0">
            <h5 className="text-lg font-bold text-gray-700">Creadores</h5>
            <ul className="text-sm text-gray-500 mt-2">
              <li><a href="#" className="hover:underline">Open Source</a></li>
              <li><a href="#" className="hover:underline">Proprietary Software</a></li>
            </ul>
          </div>

          <div className="mb-6 md:mb-0">
            <h5 className="text-lg font-bold text-gray-700">Contactos</h5>
            <ul className="text-sm text-gray-500 mt-2">
              <li><a href="#" className="hover:underline">Support</a></li>
              <li><a href="#" className="hover:underline">Sales</a></li>
              <li><a href="#" className="hover:underline">Partnerships</a></li>
            </ul>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;
