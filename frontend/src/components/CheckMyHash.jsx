import { useState } from "react";
import { ethers } from "ethers";


import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { AtSymbolIcon, CodeBracketIcon, LinkIcon } from '@heroicons/react/20/solid'

const jobOpenings = [
  {
    id: 1,
    role: 'Step 1: Enter Your Demat ID',
    href: '#',
    description:
      'Go to the input field and type your Demat ID. Then click on "Get Hash" to generate your unique hash value.',
    salary: '',
    location: '',
  },
  {
    id: 2,
    role: 'Step 2: Copy the Generated Hash',
    href: '#',
    description:
      'Click on "Copy to clipboard" below your hash. This hash will be used to verify your IPO allotment.',
    salary: '',
    location: '',
  },
  {
    id: 3,
    role: 'Step 3: Verify on IPO Details Page',
    href: '#',
    description:
      'Visit the IPO Details page and find the smart contract address. Then go to the blockchain explorer, paste your hash, and use text search to confirm it matches the stored records.',
    salary: '',
    location: '',
  },
]


const CheckMyHash = () => {
  const [dematId, setDematId] = useState("");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!dematId.trim()) return;
    const computedHash = ethers.keccak256(ethers.toUtf8Bytes(dematId.trim()));
    setHash(computedHash);
    setCopied(false);

    // Automatically switch to "Your Hash" tab
    setTimeout(() => {
      document.querySelectorAll('[role="tab"]')[1]?.click();
    }, 100);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
  };

  return (
    <>
    
   
<div className="max-w-6xl mx-auto px-6 py-12">



 {/* Content section */}
              <h2 className=" max-w-2xl text-5xl  mb-8 font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl sm:text-balance">
              Check Your Demat Hash
              </h2>
 <div className="mx-auto mt-32 max-w-7xl sm:mt-20 ">
          <div className="mx-auto flex max-w-2xl flex-col justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
            <div className="w-full lg:max-w-lg lg:flex-auto">
             
              <form action="#" className="">
                <TabGroup>
                  <TabList className="group flex items-center">
                    <Tab className="rounded-md border border-transparent bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 data-[selected]:bg-gray-100 data-[selected]:text-gray-900 data-[selected]:hover:bg-gray-200">
                      Acc No.
                    </Tab>
                    <Tab
                      className="ml-2 rounded-md border border-transparent bg-white px-3 py-1.5 text-sm font-medium text-gray-400 data-[disabled]:opacity-50 data-[selected]:bg-gray-100 data-[selected]:text-gray-900 data-[selected]:hover:bg-gray-200"
                      disabled={!hash}
                    >
                      Your Hash
                    </Tab>
                  </TabList>
                  <TabPanels className="mt-4">
                    <TabPanel className="-m-0.5 rounded-lg p-0.5">
                      <input
                        type="text"
                        placeholder="Enter your Demat ID"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm/6"
                        value={dematId}
                        onChange={(e) => setDematId(e.target.value)}
                      />
                      <div className="mt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={handleConvert}
                          className="inline-flex items-center rounded-md bg-indigo-600 px-1.5 py-2 text-sm outline-1 outline-gray-300 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Get Hash
                        </button>
                      </div>
                    </TabPanel>
                    <TabPanel className="-m-0.5 rounded-lg p-0.5">
                      <div className="flex items-center justify-between border rounded-md px-3 py-2 bg-white">
                        <p className="text-sm text-gray-800 break-all">{hash}</p>
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="ml-4 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </form>
              <p className="mt-6 text-xl/8 text-gray-600">
                Entering your Demat ID lets you generate a hash to verify if your IPO allotment is real and untampered. This adds transparency by matching it with blockchain records.
              </p>
            </div>
            <div className="w-full lg:max-w-xl lg:flex-auto">
              <h3 className="sr-only">Job openings</h3>
              <ul className="-my-8 divide-y divide-gray-100">
                {jobOpenings.map((opening) => (
                  <li key={opening.id} className="py-8">
                    <dl className="relative flex flex-wrap gap-x-3">
                      <dt className="sr-only">Role</dt>
                      <dd className="w-full flex-none text-lg font-semibold tracking-tight text-gray-900">
                        <span className="relative">{opening.role}</span>
                      </dd>
                      <dt className="sr-only">Description</dt>
                      <dd className="mt-2 w-full flex-none text-base/7 text-gray-600">{opening.description}</dd>
                      
                      <dd className="mt-4 text-base/7 font-semibold text-gray-900">{opening.salary}</dd>
                 
                      <dd className="mt-4 flex items-center gap-x-3 text-base/7 text-gray-500">
                        <svg viewBox="0 0 2 2" aria-hidden="true" className="size-0.5 flex-none fill-gray-300">
                          <circle r={1} cx={1} cy={1} />
                        </svg>
                        {opening.location}
                      </dd>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        </div>
</>
  );
};

export default CheckMyHash;
