import React, { useState } from 'react';

const FilterForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    seniority: '',
    yearsExperience: '',
    techStack: '',
  });

  const [showDropdown, setShowDropdown] = useState({
    title: false,
    location: false,
    seniority: false,
    techStack: false
  });

  // Predefined options
  const jobTitles = [
    'Software Engineer',
    'Software Developer',
    'Frontend Engineer',
    'Frontend Developer',
    'Full Stack Engineer',
    'Full Stack Developer',
    'Data Scientist',
    'Data Engineer',
    'Data Analyst',
    'Machine Learning Engineer',
    'AI Engineer',
    'DevOps Engineer',
    'Mobile Engineer',
    'QA Engineer',
    'Python Engineer',
    'Python Developer',
    'React Engineer',
    'React Developer',
    'Java Engineer',
    'Java Developer',
    'Golang Engineer',
    'Golang Developer'
  ];

  const techStacks = [
    'JavaScript',
    'Python',
    'Java',
    'Ruby',
    'React',
    'Node.js',
    'React Native',
    'C#',
    'C++',
    'AWS',
    'GCP',
    'SQL'
  ];
  

  import React, { useState, useRef, useEffect, useCallback } from 'react';

const FilterForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    seniority: '',
    yearsExperience: '',
    techStack: [],
    techStackInput: '',
  });

  const [showDropdown, setShowDropdown] = useState({
    title: false,
    location: false,
    seniority: false,
    techStack: false,
  });

  const [isValid, setIsValid] = useState(false); // Track if fields are valid
  const dropdownRefs = useRef({});

  const jobTitles = [
    'Software Engineer', 'Frontend Engineer', 'Full Stack Developer', 
    'Data Scientist', 'AI Engineer', 'DevOps Engineer', 'QA Engineer'
  ];
  const techStacks = ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL'];
  const locations = ['Remote', 'New York', 'San Francisco', 'Austin'];
  const seniorities = ['Junior', 'Mid', 'Senior', 'Lead'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && filters.techStackInput) {
      handleSelect('techStack', filters.techStackInput);
      e.preventDefault();
    }
  };

  const handleSelect = (name, value) => {
    if (name === 'techStack') {
      const updatedStack = filters.techStack.includes(value)
        ? filters.techStack.filter((tech) => tech !== value)
        : [...filters.techStack, value];

      setFilters((prev) => ({ ...prev, techStack: updatedStack, techStackInput: '' }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
    setShowDropdown((prev) => ({ ...prev, [name]: false }));
  };

  const handleFocus = (name) => {
    setShowDropdown((prev) => ({ ...prev, [name]: true }));
  };

  const filterOptions = (options, input) =>
    options.filter((option) => option.toLowerCase().includes(input.toLowerCase()));

  const validateInputs = useCallback(() => {
    const isTitleValid = !filters.title || jobTitles.includes(filters.title);
    const isLocationValid = !filters.location || locations.includes(filters.location);
    const isSeniorityValid = !filters.seniority || seniorities.includes(filters.seniority);
    const isTechStackValid = filters.techStack.every((tech) => techStacks.includes(tech));

    setIsValid(isTitleValid && isLocationValid && isSeniorityValid && isTechStackValid);
  }, [filters]);

  useEffect(() => {
    validateInputs();
  }, [filters, validateInputs]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Job Title Input */}
      <DropdownInput
        name="title"
        placeholder="Job Title"
        options={jobTitles}
        value={filters.title}
        onChange={handleInputChange}
        onSelect={handleSelect}
        isOpen={showDropdown.title}
        onFocus={() => handleFocus('title')}
        ref={(el) => (dropdownRefs.current.title = el)}
      />

      {/* Location Input */}
      <DropdownInput
        name="location"
        placeholder="Location"
        options={locations}
        value={filters.location}
        onChange={handleInputChange}
        onSelect={handleSelect}
        isOpen={showDropdown.location}
        onFocus={() => handleFocus('location')}
        ref={(el) => (dropdownRefs.current.location = el)}
      />

      {/* Seniority Input */}
      <DropdownInput
        name="seniority"
        placeholder="Seniority"
        options={seniorities}
        value={filters.seniority}
        onChange={handleInputChange}
        onSelect={handleSelect}
        isOpen={showDropdown.seniority}
        onFocus={() => handleFocus('seniority')}
        ref={(el) => (dropdownRefs.current.seniority = el)}
      />

      {/* Tech Stack Input */}
      <div className="relative" ref={(el) => (dropdownRefs.current.techStack = el)}>
        <input
          type="text"
          name="techStackInput"
          placeholder="Tech Stack"
          value={filters.techStackInput}
          onChange={handleInputChange}
          onFocus={() => handleFocus('techStack')}
          onKeyPress={handleKeyPress}
          autoComplete="off"
          className="border p-2 w-full"
        />
        {showDropdown.techStack && (
          <ul className="absolute z-10 bg-white border w-full max-h-48 overflow-y-auto shadow-md rounded-md">
            {filterOptions(techStacks, filters.techStackInput).map((tech, index) => (
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
        <div className="flex flex-wrap mt-2">
          {filters.techStack.map((tech, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2 cursor-pointer"
              onClick={() => handleSelect('techStack', tech)}
            >
              {tech} &times;
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className={`bg-blue-500 text-white p-2 rounded ${
          !isValid ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!isValid}
      >
        Search
      </button>
    </form>
  );
};

const DropdownInput = React.forwardRef(
  ({ name, placeholder, options, value, onChange, onSelect, isOpen, onFocus }, ref) => (
    <div className="relative" ref={ref}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        autoComplete="off"
        className="border p-2 w-full"
      />
      {isOpen && (
        <ul className="absolute z-10 bg-white border w-full max-h-48 overflow-y-auto shadow-md rounded-md">
          {options.length ? (
            options.map((option, index) => (
              <li
                key={index}
                onClick={() => onSelect(name, option)}
                className="p-2 hover:bg-blue-100 cursor-pointer"
              >
                {option}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  )
);

export default FilterForm;
