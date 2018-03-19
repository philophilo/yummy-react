import React from 'react';
import { Route } from 'react-router';
// import App from './components/App';
import App from './app2';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
//import CoursesPage from './components/course/CoursesPage';
//import ManageCoursePage from './components/course/ManageCoursePage';

export default (
    <Route path="/" component={App}>
        <Route component={HomePage} />
        <Route path="about" component={AboutPage} />
    </Route>
);