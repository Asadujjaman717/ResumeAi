Submitted By: Asadujjaman Turag

Project Summary

Project Name: AI Resume Enhancer

Description:
 AI Resume Enhancer is a full-stack web application that allows users to upload their resume and receive an AI-generated professional rewrite. The application improves resume quality by generating a refined version, an “About Me” summary, suggesting suitable job roles, and providing an AI-based resume score. This project demonstrates practical AI integration for real-world productivity use cases.

AI Tools Used

The following AI tools and technologies were used in this project:
OpenAI GPT-4o-mini


Used for resume analysis, rewriting, summarization, and scoring


OpenAI Chat Completion API


Handles natural language processing and text generation


Prompt Engineering


Structured prompts to guide the AI output accurately



AI Integration Approach
Backend
Built using ASP.NET 8 Web API


Resume files are uploaded as PDF/DOCX


Resume text is extracted using:


PdfPig for PDF


OpenXML for DOCX


Extracted text is sent to OpenAI via API


AI response is returned to the frontend


Frontend
Built using React (Vite)


Users upload resumes via UI


Displays AI-generated resume content


Allows downloading formatted resume as PDF



Prompt Engineering Strategy
The AI prompt was carefully structured to guide the model clearly and produce consistent output.
Prompt Structure:
Define AI role (Resume Expert)


Specify output requirements


Provide raw resume content


Request structured sections




Prompt Example
You are an AI Resume Expert.

Rewrite the following resume to be more professional and impactful.

Provide:
1. Improved Resume
2. About Me summary
3. Suggested job roles
4. Resume score (0–100) with short explanation

Resume:
{resume_text}


Prompt Summary
The prompt assigns a clear role to the AI


It requests multiple structured outputs


Ensures professional tone


Allows easy parsing and display in UI



Technology Stack
Frontend
React (Vite)


Axios


HTML / CSS


Backend
ASP.NET 8 Web API


OpenAI API


Flurl HTTP


Deployment
Frontend: Vercel


Backend: Railway


Version Control: GitHub

