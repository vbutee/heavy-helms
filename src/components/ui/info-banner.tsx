import React from 'react'

interface InfoBannerProps {
  title: string
  message: string
  className?: string
}

function InfoBanner({ title, message, className = '' }: InfoBannerProps) {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="w-full max-w-[960px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="relative col-span-1 md:col-span-2 xl:col-span-3">
            {/* Left decorative element */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            
            {/* Right decorative element */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-[2px] bg-gradient-to-l from-transparent via-amber-500 to-transparent" />
            
            {/* Main content container */}
            <div className="relative bg-gradient-to-b from-amber-800/75 to-amber-900/75 backdrop-blur-sm px-8 py-6 rounded-lg border border-amber-600/30 shadow-lg transform transition-transform hover:scale-[1.02]">
              {/* Content */}
              <div className="relative text-center leading-relaxed space-y-2">
                <h2 className="text-xl text-amber-300/90 font-bold tracking-widest uppercase">{title}</h2>
                <p className="text-amber-400/90">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoBanner 