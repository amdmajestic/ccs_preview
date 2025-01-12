import React, { Component } from 'react';
import './styles/Home.css'

class Home extends Component {
  constructor(props) {
    super(props);
    // State to manage the visibility of the button
    this.state = {
      isOnTopScroll: true,
    };
  }

  componentDidMount() {
    // Update document title when the component mounts
    document.title = "Home";

    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // Clean up the event listener when the component unmounts
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    // Show the button when scroll position is greater than 300px
    this.setState({
      isOnTopScroll: window.scrollY < 135,
    });
  };

  // scrollToTop = () => {
  //   // Scroll to the top of the page with smooth behavior
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  render() {
    return (
      <div className="relative">
        {!(this.state.isOnTopScroll) && (
          <a
            // onClick={this.scrollToTop}
            href='#main-content-container'
            className="fixed border border-red-950 text-xl font-extrabold font-serif bottom-5 right-5 p-4 px-6 rounded-full shadow-lg transition-all transform hover:scale-110 hover:shadow-xl backdrop-blur-lg bg-gradient-to-r from-red-400 via-neutral-600 to-sky-800 animate-gradient rotation-360 z-20"
          >
            ↑
          </a>
        )}
        {/* Full-Page Background and Overlay */}
        <div 
          className="min-h-screen bg-cover bg-center relative" 
          style={{ backgroundImage: `url(${$_BG_IMAGE_URL_DEF})` }} // Replace with actual background URL
        >
          <div className="dark:invisible absolute inset-0 backdrop-blur-sm bg-orange-600 bg-opacity-35 shadow-lg"></div>
          <div className="invisible dark:visible dark:absolute dark:inset-0 dark:backdrop-blur-sm dark:bg-sky-900 dark:bg-opacity-35 dark:shadow-lg"></div> {/* White blur overlay */}

          {/* Main Content */}
          <div id='main-content-container' className="flex flex-col items-center justify-center min-h-screen relative z-10 text-center text-white">
            <div className="dark:bg-slate-300 bg-royal-blue dark:bg-opacity-30 bg-opacity-80 dark:backdrop-blur-xl backdrop-blur-md p-8 rounded-3xl max-w-xl w-full shadow-2xl border-4 dark:border-white border-black border-opacity-10">
              <h2 className="text-4xl font-semibold mb-6 text-white">Welcome to Campus Coordination System <center><b>(CCS)</b></center></h2>
              <p className="text-xl mb-4 text-white">Optimize your academic life with our AI-driven tools.</p>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-white mb-6">Features</h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="#timetable"
                      className="block px-6 py-3 rounded-xl dark:bg-blue-500 bg-stone-300 dark:text-white text-dark-bg font-medium text-lg transform transition-all duration-300 hover:scale-105 dark:hover:bg-blue-600 dark:hover:text-dark-bg hover:bg-purple-950 hover:text-white shadow-lg hover:shadow-2xl glossy-button active:scale-95 dark:active:bg-blue-700 active:bg-indigo-800 active:cursor-progress"
                    >
                      AI Timetable Scheduling
                    </a>
                  </li>
                  <li>
                    <a
                      href="#course-allocation"
                      className="block px-6 py-3 rounded-xl dark:bg-blue-500 bg-stone-300 dark:text-white text-dark-bg font-medium text-lg transform transition-all duration-300 hover:scale-105 dark:hover:bg-blue-600 dark:hover:text-dark-bg hover:bg-purple-950 hover:text-white shadow-lg hover:shadow-2xl glossy-button active:scale-95 dark:active:bg-blue-700 active:bg-indigo-800 active:cursor-progress"
                    >
                      Course Allocation Management
                    </a>
                  </li>
                  <li>
                    <a
                      href="#interface"
                      className="block px-6 py-3 rounded-xl dark:bg-blue-500 bg-stone-300 dark:text-white text-dark-bg font-medium text-lg transform transition-all duration-300 hover:scale-105 dark:hover:bg-blue-600 dark:hover:text-dark-bg hover:bg-purple-950 hover:text-white shadow-lg hover:shadow-2xl glossy-button active:scale-95 dark:active:bg-blue-700 active:bg-indigo-800 active:cursor-progress"
                    >
                      User-Friendly Interface
                    </a>
                  </li>
                  <li>
                    <a
                      href="#more"
                      className="block px-6 py-3 rounded-xl dark:bg-blue-500 bg-stone-300 dark:text-white text-dark-bg font-medium text-lg transform transition-all duration-300 hover:scale-105 dark:hover:bg-blue-600 dark:hover:text-dark-bg hover:bg-purple-950 hover:text-white shadow-lg hover:shadow-2xl glossy-button active:scale-95 dark:active:bg-blue-700 active:bg-indigo-800 active:cursor-progress"
                    >
                      And Much More!
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Container with Custom Scrollbar */}
        <div className="custom-scrollbar scrollbar-behavior-smooth max-h-screen overflow-y-auto">
          {/* Full-Page Sections for Each Module */}
          <section id="timetable" className="h-screen flex items-center justify-center dark:bg-gray-500 bg-gray-100 text-center p-8">
            <div className="max-w-4xl w-full">
              <h2 className="text-4xl font-bold mb-6 dark:text-green-400 text-blue-700">AI Timetable Scheduling</h2>
              <p className="text-xl dark:text-blue-300 text-gray-700 mb-4">Our AI-driven timetable scheduling system helps you create the most efficient timetable for your classes, balancing your workload and optimizing your study hours.</p>
              <ul className="space-y-2 text-lg dark:text-stone-300">
                <li>Automatic course assignment based on your preferences</li>
                <li>AI-driven conflict resolution for overlapping classes</li>
                <li>Smart breaks and study time allocation</li>
                <li>Real-time timetable updates and notifications</li>
              </ul>
            </div>
          </section>

          <section id="course-allocation" className="h-screen flex items-center justify-center dark:bg-zinc-700 bg-gray-100 text-center p-8">
            <div className="max-w-4xl w-full">
              <h2 className="text-4xl font-bold mb-6 dark:text-green-400 text-blue-700">Course Allocation Management</h2>
              <p className="text-xl dark:text-blue-300 text-gray-700 mb-4">Our course allocation module allows universities to manage course registrations, track student enrollments, and automate course distribution for optimal student experience.</p>
              <ul className="space-y-2 text-lg dark:text-stone-300">
                <li>Easy management of course registration and allocation</li>
                <li>AI recommendations for course optimization</li>
                <li>Dynamic changes and conflict resolution</li>
                <li>Easy integration with existing student databases</li>
              </ul>
            </div>
          </section>

          <section id="interface" className="h-screen flex items-center justify-center dark:bg-gray-500 bg-gray-100 text-center p-8">
            <div className="max-w-4xl w-full">
              <h2 className="text-4xl font-bold mb-6 dark:text-green-400 text-blue-700">User-Friendly Interface</h2>
              <p className="text-xl dark:text-blue-300 text-gray-700 mb-4">We prioritize user experience with an intuitive and clean interface that adapts to students, professors, and administrators alike. Navigate with ease and efficiency.</p>
              <ul className="space-y-2 text-lg dark:text-stone-300">
                <li>Responsive design for all devices</li>
                <li>Clear, concise dashboards for quick data access</li>
                <li>Interactive controls for real-time updates</li>
                <li>Easy-to-use features with minimal learning curve</li>
              </ul>
            </div>
          </section>

          <section id="more" className="h-screen flex items-center justify-center dark:bg-zinc-700 bg-gray-100 text-center p-8">
            <div className="max-w-4xl w-full">
              <h2 className="text-4xl font-bold mb-6 dark:text-green-400 text-blue-700">And Much More!</h2>
              <p className="text-xl dark:text-blue-300 text-gray-700 mb-4">Explore more features designed to make your academic journey more efficient and enjoyable. From AI-powered recommendations to personalized study plans, we have everything covered!</p>
              <ul className="space-y-2 text-lg dark:text-stone-300">
                <li>Customizable study plans and task management</li>
                <li>Personalized academic growth tracking</li>
                <li>Seamless integration with third-party tools and systems</li>
                <li>Real-time notifications and updates</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Home;
