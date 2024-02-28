import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import StepperForm from "./components/Forms";
import { StateProvider } from "./StateContext";
import Home from "./components/Home";
import Drafts from "./components/Drafts";
import LoginPage from "./components/Login";
import Requests from "./components/Requests";
import UserDetailsScreen from "./components/UserDetailsScreen";
import DynamicForm from "./DynamicForm";
import DynamicFormParent from "./DynamicForm";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/form" element={<DynamicFormParent />} />
          <Route path="/form/:formId" element={<DynamicFormParent />} />
          <Route path="/drafts" element={<Drafts />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/approvals/:id" element={<UserDetailsScreen />} />
        </Routes>
      </StateProvider>
    </div>
  );
}

export default App;
