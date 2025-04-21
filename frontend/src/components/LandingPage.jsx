import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom';

export default function Example() {
  const navigate = useNavigate();

  return (
    <div className="relative isolate overflow-hidden bg-white">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="h-11"
          />
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm/6 font-semibold text-indigo-600 ring-1 ring-indigo-600/10 ring-inset">
                What's new
              </span>
              <button
                type="button"
                onClick={() => navigate("/ResearchPaper")}
                className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600"
              >
                <span>Research Paper</span>
                <ChevronRightIcon aria-hidden="true" className="size-5 text-gray-400" />
              </button>
            </a>
          </div>
          <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
            Blockchain-Powered Transparent IPO Allotment
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Ensure that every IPO selection is verified through a decentralized blockchain network, maintaining fairness, transparency, and trust. All registrars are integrated into the process, making IPO allotment secure and tamper-proof.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <button
              type="button"
              onClick={() => navigate("/create")}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Launch IPO Process
            </button>
            <button
              type="button"
              onClick={() => navigate("/about")}
              className="text-sm/6 font-semibold text-gray-900"
            >
              How it works <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                alt="App screenshot"
                src="https://firebasestorage.googleapis.com/v0/b/ducklingfit.appspot.com/o/IPO%20Trust%2FScreenshot%202025-04-21%20at%209.11.54%E2%80%AFPM.png?alt=media&token=1aace294-ac7c-4dbd-bb44-12d0d9af68f4"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
