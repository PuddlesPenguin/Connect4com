// FrontPage.jsx
import React, { useState } from 'react'
import './FrontPage.css'
import Sidebar from './../../global_components/SideBar/SideBar.jsx'
import SideBarLogoButton from './../../global_components/SideBar/SideBarLogoButton.jsx'
import SidebarButton from './../../global_components/SideBar/SideBarButton.jsx'
import PlayGameIcon from './../../assets/PlayGame.svg?react'
import PopTextLogo from './../../assets/PopTextLogo.svg?react'
import PuzzleIcon from './../../assets/Puzzle.svg?react'
import LearnIcon from './../../assets/Learn.svg?react'
import ProfileIcon from './../../assets/Profile.svg?react'
import Connect4Sample from './../../assets/Connect4Sample.svg'
import SidebarUserAuthButton from '../../global_components/SideBar/UserAuthButton.jsx'
import Header from '../../global_components/Header/Header.jsx'
import HeaderUserAuthButton from '../../global_components/Header/UserAuthButton.jsx'
import HeaderLogoButton from '../../global_components/Header/HeaderLogoButton.jsx'

const FrontPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#2f3136] text-white font-Nunito">
      {/* Mobile header */}
      <div className="block lg:hidden">
        <Header>
          <button
            className="lg:hidden mr-0 p-0 focus:outline-none"
            onClick={() => setSidebarOpen(o => !o)}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <HeaderLogoButton icon={PopTextLogo} />
          <HeaderUserAuthButton
              text="Login"
                  to="/login"
                  bg_color="bg-[#60a7b1]"
                  hover_color="hover:bg-[#70b7b9]"
                />
                <HeaderUserAuthButton
                  text="Sign Up"
                  to="/signup"
                  bg_color="bg-[#537178]"
                  hover_color="hover:bg-[#638188]"
                />        </Header>

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            {/* sidebar panel */}
            <div className="relative z-50 w-64 bg-[#2f3136]">
              <Sidebar>
                <SideBarLogoButton icon={PopTextLogo} />
                <SidebarButton icon={PlayGameIcon} text="Play Online" />
                <SidebarButton icon={PuzzleIcon} text="Puzzles" />
                <SidebarButton icon={LearnIcon} text="Learn" />
                <SidebarButton icon={ProfileIcon} text="View Profile" />
                <SidebarUserAuthButton
                  text="Login"
                  to="/login"
                  bg_color="bg-[#60a7b1]"
                  hover_color="hover:bg-[#70b7b9]"
                />
                <SidebarUserAuthButton
                  text="Sign Up"
                  to="/signup"
                  bg_color="bg-[#537178]"
                  hover_color="hover:bg-[#638188]"
                />
              </Sidebar>
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar>
          <SideBarLogoButton icon={PopTextLogo} />
          <SidebarButton icon={PlayGameIcon} text="Play Online" />
          <SidebarButton icon={PuzzleIcon} text="Puzzles" />
          <SidebarButton icon={LearnIcon} text="Learn" />
          <SidebarButton icon={ProfileIcon} text="View Profile" />
          <SidebarUserAuthButton
            text="Login"
            to="/login"
            bg_color="bg-[#60a7b1]"
            hover_color="hover:bg-[#70b7b9]"
          />
          <SidebarUserAuthButton
            text="Sign Up"
            to="/signup"
            bg_color="bg-[#537178]"
            hover_color="hover:bg-[#638188]"
          />
        </Sidebar>
      </div>

      {/* Main content */}
      <main className="flex-1 w-full pl-0 lg:pl-[250px] mt-[100px] lg:mt-8">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:items-center justify-center">
          <div className="hidden sm:flex justify-center lg:w-auto">
            <img
              className="w-[550px] min-w-[200px] max-w-full mb-8 lg:mb-0"
              src={Connect4Sample}
              alt="Connect4 Sample"
            />
          </div>
          <div className="w-full lg:w-2/5 text-center flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Play Connect4 Online on the #1 site!</h1>
            <p className="text-lg">Start a new game or explore the sidebar.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default FrontPage
