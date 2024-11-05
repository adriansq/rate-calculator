import React, { useState, useRef, useEffect } from 'react';

const FilterForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    seniority: '',
    techStack: [],
  });

  const [inputValues, setInputValues] = useState({ techStackInput: '' });
  const [showDropdown, setShowDropdown] = useState({
    location: false,
    seniority: false,
    techStack: false,
  });

  const [isValid, setIsValid] = useState(false);
  const dropdownRefs = useRef({});

  // Predefined options
  const jobTitles = [
    'Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 
    'Data Scientist', 'DevOps Engineer', 'Product Manager', 'UI/UX Designer'
  ];

  const techStacks = ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'AWS', 'SQL', 'Docker'];
  const locations = ['Remote', 'New York', 'San Francisco', 'Austin', 'Chicago', 'Boston', 'Los Angeles'];
  const seniorities = ['Junior', 'Mid-level', 'Senior', 'Lead'];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'techStackInput') {
      setInputValues({ techStackInput: value });
      setShowDropdown((prev) => ({ ...prev, techStack: value.length > 0 }));
    } else {
      setFilters({ ...filters, [name]: value });
      setShowDropdown((prev) => ({ ...prev, [name]: value.length > 0 }));
    }
  };

  const handleSelect = (name, value) => {
    if (name === 'techStack') {
      const newTechStack = filters.techStack.includes(value)
        ? filters.techStack.filter((tech) => tech !== value)
        : [...filters.techStack, value];

      setFilters({ ...filters, techStack: newTechStack });
      setInputValues({ techStackInput: '' });
      setShowDropdown((prev) => ({ ...prev, techStack: false }));
    } else {
      setFilters({ ...filters, [name]: value });
      setShowDropdown((prev) => ({ ...prev, [name]: false }));
    }
  };

  const filterOptions = (options, input) =>
    options
      .filter((option) => option.toLowerCase().includes(input.toLowerCase())) // match user input
      .filter((option) => !filters.techStack.includes(option)); // exclude already selected tech stacks

  const validateInputs = () => {
    const isTitleValid = !!filters.title;
    const isSeniorityValid = !filters.seniority || seniorities.includes(filters.seniority);
    const isTechStackValid = filters.techStack.every((tech) => techStacks.includes(tech));
    
    setIsValid(isTitleValid && isSeniorityValid && isTechStackValid);
  };

  useEffect(() => {
    validateInputs();
  }, [filters]);

  const handleClickOutside = (e) => {
    for (let name in dropdownRefs.current) {
      if (!dropdownRefs.current[name].contains(e.target)) {
        setShowDropdown((prev) => ({ ...prev, [name]: false }));
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid) onSearch(filters)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Job Title Dropdown */}
      <div className="relative max-w-[250px] min-w-[250px]">
        <label htmlFor="title" className="block mb-1 font-medium">Job Title</label>
        <select
          name="title"
          id="title"
          value={filters.title}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Job Title</option>
          {jobTitles.map((title, index) => (
            <option key={index} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>

      {/* Location Input */}
      <div className="relative max-w-[250px] min-w-[250px]" ref={(el) => (dropdownRefs.current.location = el)}>
        <input
          type="text"
          name="location"
          placeholder="Type to search location"
          value={filters.location}
          onChange={handleChange}
          autoComplete="off"
          className="border p-2 w-full"
        />
        {showDropdown.location && (
          <ul className="absolute z-10 bg-white border w-full max-h-48 overflow-y-auto shadow-md rounded-md">
            {filterOptions(locations, filters.location).map((location, index) => (
              <li
                key={index}
                onClick={() => handleSelect('location', location)}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                {location}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Seniority Dropdown */}
      <div className="relative max-w-[250px] min-w-[250px]">
        <select
          name="seniority"
          id="seniority"
          value={filters.seniority}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Seniority</option>
          {seniorities.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Tech Stack Input with Multi-Selection */}
      <div className="relative" ref={(el) => (dropdownRefs.current.techStack = el)}>
        <input
          type="text"
          name="techStackInput"
          placeholder="Type to search Tech Stack"
          value={inputValues.techStackInput}
          onChange={handleChange}
          autoComplete="off"
          className="border p-2 w-full"
        />
        {showDropdown.techStack && (
          <ul className="absolute z-10 bg-white border w-full max-h-48 overflow-y-auto shadow-md rounded-md">
            {filterOptions(techStacks, inputValues.techStackInput).map((tech, index) => (
              <li
                key={index}
                onClick={() => handleSelect('techStack', tech)}
                className={`p-2 hover:bg-blue-100 cursor-pointer ${
                  filters.techStack.includes(tech) ? 'bg-blue-200' : ''
                }`}
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
        
        {/* Selected Tech Stack Tags with Wrapping */}
        <div className="flex flex-wrap mt-5 space-x-2 max-w-[250px] min-w-[250px]">
          {filters.techStack.map((tech, index) => (
            <div key={index} className='flex flex-wrap'>
              <span
                className="bg-blue-500 text-white px-2 py-1 rounded mr-1 mb-2 cursor-pointer text-sm"
                onClick={() => handleSelect('techStack', tech)}
                style={{ maxWidth: '100%' }}
              >
                {tech} &times;
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className={`bg-blue-500 text-white p-2 rounded ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isValid}
      >
        Search
      </button>
    </form>
  );
};

export default FilterForm;
