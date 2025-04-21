import { Disclosure } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom';

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center">
              <img
                alt="Our logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/LandingPage" className={({ isActive }) => isActive
                ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"}>
                Home
              </NavLink>
              <NavLink to="/" className={({ isActive }) => isActive
                ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"}>
                Ongoing IPOs
              </NavLink>
              <NavLink to="/Create" className={({ isActive }) => isActive
                ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"}>
                Create IPO
              </NavLink>
              <NavLink to="/Check" className={({ isActive }) => isActive
                ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"}>
                Check MyHash
              </NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* <button
              type="button"
              className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button> */}

            
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </Disclosure.Button>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 pt-2 pb-3">
          <NavLink to="/" className={({ isActive }) => isActive
            ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700"
            : "block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}>
            Home
          </NavLink>
          <NavLink to="/IPOList" className={({ isActive }) => isActive
            ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700"
            : "block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}>
            Ongoing IPOs
          </NavLink>
          <NavLink to="/CreateIPO" className={({ isActive }) => isActive
            ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700"
            : "block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}>
            Create IPO
          </NavLink>
          <NavLink to="/CheckMyHash" className={({ isActive }) => isActive
            ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700"
            : "block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}>
            Check MyHash
          </NavLink>
        </div>
        
      </Disclosure.Panel>
    </Disclosure>
  )
}
