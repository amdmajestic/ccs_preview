import React, { Component } from "react";
import api from "/src/functions/api";
import { createAndShowAlert } from "../functions/react_segments";

class Instructor_Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: props.profilePicture || "",
      name: props.name || "",
      email: props.email || "",
      bio: props.bio || "",
      selectedCourses: props.selectedCourses || [],
      gender: props.gender || "",
      expertise: props.expertise || [],
      degree: props.degree || "",
      teachingExperience: props.teachingExperience || "",
      isVisiting: props.isVisiting || false,
      timeSlots: props.timeSlots || "",
      courseList: props.courseList || [],
      loadingCourses: props.loadingCourses || false,
      errorLoadingCourses: props.errorLoadingCourses || false,
    };
    this.fileInputRef = React.createRef();
  }

  // Fetch course list data from API when the component mounts
  componentDidMount() {
    document.title = "Update Instructor Profile";
    this.fetchCourses();
  }



  fetchCourses = () => {
    api
      .get('http://localhost:8000/course_allocation/courses/')
      .then((response) => {
        this.setState({
          courseList: response.data,
          loadingCourses: false,
        });
      })
      .catch(() => {
        this.setState({
          errorLoadingCourses: true,
          loadingCourses: false,
        });
      });
  };

  handleSubmit = async (event) => {    
    const {
      profilePicture, name, email, bio, selectedCourses, gender, expertise,
      degree, teachingExperience, isVisiting, timeSlots
    } = this.state;
    event.preventDefault();
    const { instructorId } = this.props;

    const user_obj = {
      'user': {
        name: name,
        email: email,
      }
    }

    const updatedFormData = new FormData();
      updatedFormData.append("user", JSON.stringify(user_obj));
      updatedFormData.append("profile_picture", profilePicture);  // Assuming profilePicture is a file or string
      updatedFormData.append("bio", bio);  // Text field for bio
      updatedFormData.append("degree", degree);  // Degree as string ('Bachelors', 'Masters', 'PhD')
      updatedFormData.append("expertise", JSON.stringify(expertise));  // Expertise array as JSON string
      updatedFormData.append("teaching_experience", teachingExperience);  // Integer for teaching experience
      updatedFormData.append("is_visiting", isVisiting);  // Boolean for is_visiting (true/false)
      updatedFormData.append("time_slots", timeSlots);  // Time slots as a string (e.g., 'Monday 10-12, Wednesday 2-4')
      updatedFormData.append("course_preferences", JSON.stringify(selectedCourses));  // Course preferences as JSON string
      updatedFormData.append("gender", gender);  // Gender ('Male' or 'Female')
      

    try {
      const response = await api.patch(`api/instructors/profile/${instructorId}/`, 
        updatedFormData, {
          headers: {
            // Set the content type to multipart/form-data
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response);
      

      if (response.status === 200) {
        // UPDATED
        createAndShowAlert("info", "Profile Updated Successfully", true);
      } else if (res.status === 204) {
        DELETED
        createAndShowAlert("error", "Profile Deleted Successfully", true);
      }
    } catch (error) {
      console.log("Profile Update Error: "+ error);
    }
  }

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ profilePicture: reader.result });
      };
      console.log(this.state.profilePicture);
      console.log(file);
      
      reader.readAsDataURL(file);
    }
  };

  handleRemoveImage = () => {
    this.setState({ profilePicture: "" });
    if (this.fileInputRef.current) {
      this.fileInputRef.current.value = "";
    }
  };

  handleCourseChange = (courseName) => {
    const { selectedCourses } = this.state;
    const newSelectedCourses = selectedCourses.includes(courseName)
      ? selectedCourses.filter((course) => course !== courseName)
      : [...selectedCourses, courseName];
    this.setState({ selectedCourses: newSelectedCourses });
  };

  handleGenderChange = (event) => {
    this.setState({ gender: event.target.value });
  };

  handleExpertiseChange = (index, value) => {
    const newExpertise = [...this.state.expertise];
    newExpertise[index] = value;
    this.setState({ expertise: newExpertise });
  };

  addExpertiseField = () => {
    this.setState({ expertise: [...this.state.expertise, ""] });
  };

  removeExpertiseField = (index) => {
    const newExpertise = this.state.expertise.filter((_, i) => i !== index);
    this.setState({ expertise: newExpertise });
  };

  renderCoursePreferences = () => {
    const { loadingCourses, errorLoadingCourses, courseList, selectedCourses } =
      this.state;

    if (loadingCourses) return <p>Loading courses...</p>;
    if (errorLoadingCourses)
      return (
        <p className="text-red-500">Error loading courses. Please try again.</p>
      );

    return courseList.map((course) => (
      <div key={course.id} className="flex items-center">
        <input
          type="checkbox"
          value={course.name}
          checked={selectedCourses.includes(course.name)}
          onChange={() => this.handleCourseChange(course.name)}
          className="mr-2"
        />
        <label>{course.name}</label>
      </div>
    ));
  };

  render() {
    const {
      profilePicture,
      name,
      email,
      bio,
      gender,
      expertise,
      degree,
      teachingExperience,
      isVisiting,
      timeSlots,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-lg rounded-lg"
      >
        <h1 className="text-3xl font-bold text-blue-700 dark:text-white text-center mb-8">
          Instructor Profile Form
        </h1>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-blue-600 dark:text-gray-300">
            Profile Picture:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={this.handleFileUpload}
            ref={this.fileInputRef}
            className="w-full border border-blue-300 dark:border-gray-600 p-2 rounded-lg focus:ring focus:ring-blue-200 dark:focus:ring-gray-700 custom-file-input transition duration-300 ease-in-out transform hover:scale-105 dark:text-cyan-200 cursor-pointer"
          />
          {profilePicture && (
            <div className="mt-4 flex justify-center items-center">
              <img
                src={profilePicture}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full border-2 border-blue-500 dark:border-gray-500"
              />
              <button
                type="button"
                onClick={this.handleRemoveImage}
                className="ml-4 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-blue-600 dark:text-gray-300">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => this.setState({ name: e.target.value })}
            className="w-full border border-blue-300 dark:border-gray-600 p-2 rounded-lg focus:ring focus:ring-blue-200 dark:focus:ring-gray-700"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-blue-600 dark:text-gray-300">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            className="w-full border border-blue-300 dark:border-gray-600 p-2 rounded-lg focus:ring focus:ring-blue-200 dark:focus:ring-gray-700"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-blue-600 dark:text-gray-300">
            Bio:
          </label>
          <textarea
            value={bio}
            onChange={(e) => this.setState({ bio: e.target.value })}
            className="w-full border border-blue-300 dark:border-gray-600 p-2 rounded-lg focus:ring focus:ring-blue-200 dark:focus:ring-gray-700"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-blue-600 dark:text-gray-300">
            Degree:
          </label>
          <select
            value={degree}
            onChange={(e) => this.setState({ degree: e.target.value })}
            className="w-full border border-blue-300 dark:border-gray-600 p-2 rounded-lg focus:ring focus:ring-blue-200 dark:focus:ring-gray-700"
          >
            <option value="">Select Degree</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-blue-600 dark:text-gray-300">
            Teaching Experience (in years):
          </label>
          <input
            type="number"
            value={teachingExperience}
            onChange={(e) =>
              this.setState({ teachingExperience: e.target.value })
            }
            placeholder="Enter years of teaching experience"
            className="w-full border border-blue-300 dark:border-gray-600 p-2 rounded-lg focus:ring focus:ring-blue-200 dark:focus:ring-gray-700"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-blue-600 dark:text-gray-300">
            Teaching Type:
          </label>
          <select
            value={isVisiting ? "Visiting" : "Permanent"}
            onChange={(e) =>
              this.setState({ isVisiting: e.target.value === "Visiting" })
            }
            className="w-full border border-blue-300 dark:border-gray-600 p-2 rounded-lg focus:ring focus:ring-blue-200 dark:focus:ring-gray-700"
            >
              <option value="Permanent">Permanent</option>
              <option value="Visiting">Visiting</option>
            </select>
          </div>
          {isVisiting && (
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2 text-blue-600 dark:text-gray-300">
                Available Time Slots:
              </label>
              <input
                type="text"
                value={timeSlots}
                onChange={(e) => this.setState({ timeSlots: e.target.value })}
                placeholder="Enter your available time slots"
                className="w-full border border-blue-300 dark:border-gray-600 p-2 rounded-lg focus:ring focus:ring-blue-200 dark:focus:ring-gray-700"
              />
            </div>
          )}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2 text-blue-600 dark:text-gray-300">
              Course Preferences:
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-scroll bg-sky-300 dark:bg-yellow-200 p-3">
              {this.renderCoursePreferences()}
            </div>
          </div>
          <div className="mb-6 dark:text-cyan-50">
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-gray-300">
              Gender
            </h3>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={this.handleGenderChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={this.handleGenderChange}
                className="mr-2"
              />
              Female
            </label>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-gray-300">
              Expertise
            </h3>
            {expertise.map((exp, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={exp}
                  onChange={(e) =>
                    this.handleExpertiseChange(index, e.target.value)
                  }
                  className="mr-2 p-1 border rounded bg-lime-100 dark:bg-slate-300 text-amber-950"
                />
                <button
                  type="button"
                  onClick={() => this.removeExpertiseField(index)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={this.addExpertiseField}
              className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
            >
              Add Expertise
            </button>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-10/12 bg-blue-600 dark:bg-indigo-500 text-white py-3 mt-16 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-800 transition-all font-bold"
            >
              Adapt Changes
            </button>
          </div>
        </form>
      );
    }
  }
  
export default Instructor_Profile;