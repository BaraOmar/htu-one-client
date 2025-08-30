import React from "react";
import "./css/StudentCoursePreferences.css";
import CoursePreferencesForm from "./CoursePreferencesForm";


function StudentCoursePreferences() {
    return (
        <div className="cp-page">
            <h1 className="cp-title">Course Preferences</h1>
            <CoursePreferencesForm />
        </div>
    );
}


export default StudentCoursePreferences;
