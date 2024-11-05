import React, { useState } from 'react';
import FilterForm from './FilterForm';
import Results from './Results';
import { arrayToString } from '../utils/arrayToString';

const App = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [jobData, setJobData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchResults = async (filters) => {
    setLoading(true); // Set loading to true when search starts

    const { title, location, seniority, techStack } = filters;

    const techStackString = arrayToString(techStack)

    const url = `https://jsearch.p.rapidapi.com/estimated-salary?job_title=${seniority}%20${title}%20${techStackString}&location=${location}&radius=100`;
    const options = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': '9c40620775msh260ec79e8725149p15abddjsna9500c4fa5fb',
		    'x-rapidapi-host': 'jsearch.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const data = await response.json();
      setIsSearching(true);
      setJobData(data);
    } catch (error) {
	    console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleBackToSearch = () => {
    setIsSearching(false);
    setJobData([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rate Calculator</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : isSearching ? (
        <Results jobData={jobData} onBack={handleBackToSearch} />
      ) : (
        <FilterForm onSearch={fetchResults} />
      )}
    </div>
  );
};

export default App;
