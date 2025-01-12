import React, { Component } from "react";
import { FaLaptopCode } from "react-icons/fa";
import axios from "axios";

class Course_Allocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lectures: [],
      loading: true,
      department: "bsse",
      season: "fall",
      batch: "2024",
      hec_rev_crc: null,
    };
  }

  componentDidMount() {
    document.title = "Course Allocation";
    this.setState({ hec_rev_crc: 'HEC Revised Curriculum 2023' });

    axios
      .get("http://localhost:8000/course_allocation/lectures/")
      .then((response) => {
        this.setState({ lectures: response.data, loading: false });
      })
      .catch((error) => {
        console.error("Error fetching lectures data:", error);
        this.setState({ loading: false });
      });
  }

  getUniqueSemesters = (lectures) => {
    // const activeSemesters = lectures.filter((lecture) => lecture.lec_class_id.class_semester_id.is_active);
    // const semesters = activeSemesters.map((lecture) => lecture.lec_class_id.class_semester_id.count);
    const semesters = lectures.map((lecture) => lecture.lec_class_id.class_semester_id.id);
    // convert the Set object back to an array 
    const uniqueSemesters = [...new Set(semesters)];
    // return uniqueSemesters.filter((semester) => parseInt(semester) % 2 !== 0).sort();
    return uniqueSemesters.sort();
  };
  
  getUniqueSections = (semesterLectures) => {
    const sections = semesterLectures.map((semesterLecture) => semesterLecture.lec_class_id.class_section_id.name);
    // convert the Set object back to an array 
    const uniqueSections = [...new Set(sections)];
    // return uniqueSemesters.filter((semester) => parseInt(semester) % 2 !== 0).sort();
    return uniqueSections.sort();
  };
  
  
  renderTables = () => {
    // const groupedLectures = this.groupLecturesByClass();
    // alert(lecture.lec_class_id.class_semester_id);
    // const { class_semester_id } = lecture.lec_class_id;
      // const { lec_class_id } = lecture;

    const { hec_rev_crc, department, season, batch, lectures } = this.state;
    const uniqueSemesters = this.getUniqueSemesters(lectures);

    return uniqueSemesters.map((semester_no, index) => {
      let totalCreditHrs = 0
      const semesterLectures = lectures.filter((lecture) => {
        return lecture.lec_class_id.class_semester_id.id === semester_no
      });

      
      
      if(semesterLectures) {
        const uniqueSections = this.getUniqueSections(semesterLectures);
        const lectureCourses = semesterLectures.filter((lecture) => lecture.lec_class_id.class_section_id.name === uniqueSections[0]);


        return (
            <div key={index} className="mb-16">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="table-auto min-w-full border border-collapse border-black font-sans font-normal max-sm:text-xs sm:text-sm md:text-md lg:text-lg whitespace-nowrap">
                  <thead className="bg-sky-400 font-bold">
                    <tr>
                      <th style={{fontFamily: 'serif'}} colSpan={8} className="border border-black py-1 font-extrabold max-sm:text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        {`${department.toUpperCase()}-${semester_no} (${season.toSentenceCase()}-${batch}) Batch`}
                      </th>
                    </tr>
                    {
                      hec_rev_crc && (
                        <tr>
                          <th colSpan={8} className="border border-black font-thin font-mono">({hec_rev_crc})</th>
                        </tr>
                      )
                    }
                    <tr>
                      <th colSpan={4} className="border border-black font-bold">COURSE DETAILS</th>
                      <th colSpan={4} className="border border-black font-bold">COURSE INSTRUCTORS</th>
                    </tr>
                    <tr>
                      <th className="border border-black font-semibold bg-gray-400">Course</th>
                      <th className="border border-black font-semibold bg-gray-400">Courses</th>
                      <th className="border border-black font-semibold bg-gray-400">Credit</th>
                      <th className="border border-black font-semibold bg-gray-400">Pre-requisite</th>
                      <th className="border border-black font-semibold bg-gray-400">Course</th>
                      <th colSpan={uniqueSections.length} className="border border-black font-semibold bg-gray-400">Section</th>
                    </tr>
                    <tr>
                    <th className="border border-black font-semibold bg-gray-400">Codes</th>
                      <th className="border border-black font-semibold bg-gray-400">Title</th>
                      <th className="border border-black font-semibold bg-gray-400">Hrs</th>
                      <th className="border border-black font-semibold bg-gray-400"></th>
                      <th className="border border-black font-semibold bg-gray-400">Coordinator</th>
                      {                        
                        uniqueSections.map((uniqueSection, index) =>
                          <th key={index} className="border border-black font-semibold bg-gray-400">{uniqueSection}</th>
                        )
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      lectureCourses && 
                      lectureCourses.map((lecture, index) => {
                          totalCreditHrs += lecture.lec_course_id.credit_hours;
                          return (
                              <tr
                                key={index}
                                className={
                                  lecture.lec_instr_id === null
                                    ? "bg-red-200"
                                    : "bg-green-100"
                                }
                              >
                                <td className="border border-black px-4 py-2 bg-yellow-300">
                                {lecture.lec_course_id.code}
                                </td>
                                <td className="border border-black px-4 py-2 bg-yellow-300">
                                  {lecture.lec_course_id.name}
                                </td>
                                <td className="border border-black px-4 py-2 text-center">
                                  {lecture.lec_course_id.credit_hours}
                                </td>
                                <td className="border border-black px-4 py-2 text-center">
                                  None &lt;?op&gt;
                                </td>
                                <td className="border border-black px-4 py-2 bg-gray-300">
                                  {lecture.lec_course_id.crs_coordinator_id?.user.name || "N/A"}
                                </td>
                                  {
                                    Array.from({ length: lecture.lec_class_id.class_semester_id.has_sections })
                                    .map((section_no, index) => (
                                      <td key={index} className="border border-black px-4 py-2">
                                        {lecture.lec_instr_id ? lecture.lec_instr_id.user.name : "No Instructor Assigned"}
                                      </td>
                                    ))
                                  }
                                
                              </tr>
                            )})
                        }
                        <tr>
                          <td colSpan="2" className="border border-black bg-gray-400 pl-3 p-2 font-bold">Total Credits</td>
                          <td colSpan="1" className="border border-black p-2 text-center font-bold bg-gray-400">{totalCreditHrs}</td>
                          <td colSpan="5" className="border border-black p-2"></td>
                        </tr>

                        {
                          index === 0 && (
                            <>
                              <tr>
                                <td colSpan="8" className="border border-none py-4 text-center font-bold"></td>
                              </tr>
                              <tr>
                                  <td  colSpan="2" className="border border-black border-t-gray-500 border-r-gray-500 px-4 py-2 bg-green-600 "> DeficencyCourse</td>
                              </tr>
                              <tr className="bg-green-100">
                                  <td className="border border-black px-4 py-2 bg-yellow-300">MTH0001</td>
                                  <td  className="border border-black px-4 py-2 bg-yellow-300">Foundation Math-I</td>
                                  <td className="border border-black px-4 py-2 text-center">3</td>
                                  <td className="border border-black px-4 py-2 text-center">None</td>
                                  <td className="border border-black bg-gray-300 px-4 py-2 text-center"></td>
                                  <td colSpan={uniqueSections.length} className="border border-black px-4 py-2 bg-green-100">Ms. Asma Parveen</td>
                              </tr>
                            </>
                            )
                          }
                      </tbody>
                  </table>
                </div>
            </div>
          )
        }
      });
    }

    refreshPage = () => {
      location.reload();
    }

  render() {
    const { season, batch, lectures, loading } = this.state;

    return (
      <>
        <div className="px-5 flex flex-col font-bold dark:text-white">
          <span className="text-center text-xl underline py-3">
            Course Offering - {`${season.toSentenceCase()} ${batch}`}
          </span>
          <span className="text-left lg:text-sm py-2">
            Ver 1.0
          </span>
        </div>
        <div className="p-4 bg-grey-100 border border-sky-50 mt-2 min-h-screen">
          {loading ? (
            <div>
              <p className="text-center text-blue-500 mb-5 scale-125">Loading...</p>
                <FaLaptopCode className="loader m-auto scale-150 text-indigo-500"/>
            </div>
          ) : lectures.length === 0 ? (
            <div className="text-center">
              <p className="text-red-500 mb-3">No Course Allocation Schedule Created Yet!</p>
              <button 
                onClick={this.refreshPage} 
                className="border border-blue-700 font-mono dark:bg-sky-400 hover:dark:bg-sky-700 p-2 rounded-lg hover:bg-blue-700 hover:text-gray-200 hover:scale-110"
              >
                Click to Try Again!
              </button>
            </div>
          ) : (
            this.renderTables()
          )}
        </div>
      </>
    );
  }
}

export default Course_Allocation;