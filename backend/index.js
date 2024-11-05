const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Mock Data
const jobs = [
  { title: "Software Engineer", location: "New York", seniority: "Mid-level", min_salary: 100000, max_salary: 135000, average_salary: 117500, tech_stack: ["JavaScript", "React", "Node.js"] },
  { title: "Senior Software Engineer", location: "New York", seniority: "Senior", years_of_experience: 5, average_salary: 135000, tech_stack: ["HTML", "CSS", "React", "Tailwind CSS"] },
  { title: "Backend Developer", location: "Austin", seniority: "Junior", years_of_experience: 1, average_salary: 85000, tech_stack: ["Node.js", "Express.js", "MongoDB"] },
  { title: "Data Scientist", location: "Chicago", seniority: "Mid-level", years_of_experience: 4, average_salary: 130000, tech_stack: ["Python", "TensorFlow", "SQL"] },
  { title: "DevOps Engineer", location: "Remote", seniority: "Senior", years_of_experience: 6, average_salary: 145000, tech_stack: ["AWS", "Docker", "Kubernetes"] },
  { title: "Full Stack Developer", location: "Los Angeles", seniority: "Mid-level", years_of_experience: 3, average_salary: 115000, tech_stack: ["JavaScript", "Vue.js", "Node.js", "MySQL"] },
  { title: "Mobile Developer", location: "Seattle", seniority: "Junior", years_of_experience: 2, average_salary: 95000, tech_stack: ["Flutter", "Dart", "Firebase"] },
  { title: "Machine Learning Engineer", location: "San Francisco", seniority: "Senior", years_of_experience: 5, average_salary: 160000, tech_stack: ["Python", "PyTorch", "Keras"] },
  { title: "Product Manager", location: "Remote", seniority: "Mid-level", years_of_experience: 4, average_salary: 125000, tech_stack: ["Agile", "Jira", "Confluence"] },
  { title: "Cloud Architect", location: "Boston", seniority: "Senior", years_of_experience: 7, average_salary: 170000, tech_stack: ["Azure", "Terraform", "Ansible"] },
  { title: "UI/UX Designer", location: "New York", seniority: "Mid-level", years_of_experience: 4, average_salary: 105000, tech_stack: ["Figma", "Sketch", "Adobe XD"] },
  { title: "Security Analyst", location: "Washington D.C.", seniority: "Junior", years_of_experience: 2, average_salary: 95000, tech_stack: ["SIEM", "Splunk", "Firewall"] },
];

// Routes
app.get('/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/filter', (req, res) => {
  const { title, location, seniority, techStack } = req.body;
  
  const filteredJobs = jobs.filter((job) =>
    (!title || job.title.includes(title)) &&
    (!location || job.location === location) &&
    (!seniority || job.seniority === seniority) &&
    (!techStack || 
      techStack.every((tech) => job.tech_stack.includes(tech)))
  );

  res.json(filteredJobs);
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
