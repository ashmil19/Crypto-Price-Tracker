
import { SiBitcoinsv } from "react-icons/si";
import { TbLogout2 } from "react-icons/tb";


function Navbar() {

  return (
    <div>
      <nav className="w-screen bg-gray-900">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 w-full items-center justify-between">
            <div className="flex w-full items-center justify-between">
              <div className="flex-shrink-0">
                <div
                  className="h-10 w-10 flex justify-center items-center"
                ><SiBitcoinsv color="yellow" size={'30px'} /></div>
              </div>
              
              <div>
                  <TbLogout2 cursor={'pointer'} color="white" size={'30px'} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
