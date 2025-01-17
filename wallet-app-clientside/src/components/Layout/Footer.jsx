import { HeartIcon } from '@heroicons/react/24/solid'

function Footer() {
  return (
    <footer className="bg-white shadow-sm mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <span>Made with</span>
            <HeartIcon className="h-4 w-4 text-red-500" />
            <span>by</span>
            <a 
              href="https://elyseeniyibizi.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Elysée NIYIBIZI
            </a>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Wallet App. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 