import React from 'react';

const Results = ({ jobData, onBack }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Salary Information for {jobData.parameters.job_title}</h2>
      <p>Location: {jobData.parameters.location}</p>
      <p>Radius: {jobData.parameters.radius} miles</p>

      <div className="mt-4">
        {jobData.data && jobData.data.length > 0 ? (
          jobData.data.map((job, index) => (
            <div key={index} className="border p-4 mb-4 rounded shadow-md">
              <h3 className="text-lg font-semibold">{job.job_title}</h3>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Publisher:</strong> <a href={job.publisher_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{job.publisher_name}</a></p>
              <p><strong>Median Salary:</strong> ${job.median_salary.toLocaleString()}</p>
              <p><strong>Salary Range:</strong> ${job.min_salary.toLocaleString()} - ${job.max_salary.toLocaleString()}</p>
              <p><strong>Salary Period:</strong> {job.salary_period}</p>
              <p><strong>Currency:</strong> {job.salary_currency}</p>
            </div>
          ))
        ) : (
          <p>No salary data available.</p>
        )}
      </div>

      <button onClick={onBack} className="bg-blue-500 text-white p-2 rounded mt-4">
        Back to Search
      </button>
    </div>
  );
};

export default Results;
