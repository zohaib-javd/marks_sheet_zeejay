#!/usr/bin/env ts-node

import inquirer from 'inquirer';
import chalk from 'chalk';
import boxen from 'boxen';

interface SubjectMarks {
  subject: string;
  marks: number;
}

interface Student {
  name: string;
  rollNumber: number;
  subjects: SubjectMarks[];
}

const students: Student[] = [
  {
    name: "Zohaib Javed",
    rollNumber: 1234,
    subjects: [
      { subject: "English", marks: 85 },
      { subject: "Biology", marks: 90 },
      { subject: "Chemistry", marks: 78 },
      { subject: "Physics", marks: 85 },
      { subject: "Computer", marks: 90 },
      { subject: "Maths", marks: 65 },
      { subject: "Economics", marks: 85 },
      { subject: "Urdu", marks: 72 },
      { subject: "Sindhi", marks: 78 },
    ],
  },
  {
    name: "Farhan Faisal",
    rollNumber: 5678,
    subjects: [
      { subject: "English", marks: 72 },
      { subject: "Biology", marks: 85 },
      { subject: "Chemistry", marks: 77 },
      { subject: "Physics", marks: 82 },
      { subject: "Computer", marks: 85 },
      { subject: "Maths", marks: 75 },
      { subject: "Economics", marks: 58 },
      { subject: "Urdu", marks: 79 },
      { subject: "Sindhi", marks: 85 },
    ],
  },
  {
    name: "Kashif Ali",
    rollNumber: 9101,
    subjects: [
      { subject: "English", marks: 80 },
      { subject: "Biology", marks: 88 },
      { subject: "Chemistry", marks: 92 },
      { subject: "Physics", marks: 95 },
      { subject: "Computer", marks: 96 },
      { subject: "Maths", marks: 77 },
      { subject: "Economics", marks: 62 },
      { subject: "Urdu", marks: 93 },
      { subject: "Sindhi", marks: 89 },
    ],
  },
];

function calculateGrade(percentage: number): string {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}

async function selectStudent() {
  const choices = students.map((student, index) => ({
    name: `${student.name} (Roll No: ${student.rollNumber})`,
    value: index,
  }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'studentIndex',
      message: 'Select a student:',
      choices,
    },
    {
      type: 'confirm',
      name: 'showCompleteMarksheet',
      message: 'Do you want to see the complete mark sheet?',
      default: false,
    },
  ]);

  const student = students[answers.studentIndex];
  let totalObtainedMarks = 0;
  const totalMarks = student.subjects.length * 100;

  console.log(chalk.yellow(boxen(`Student: ${student.name}\nRoll Number: ${student.rollNumber}`, { padding: 1, margin: 1, borderStyle: 'double' })));
  
  if (answers.showCompleteMarksheet) {
    student.subjects.forEach(subject => {
      console.log(`${subject.subject}: ${subject.marks} Marks`);
      totalObtainedMarks += subject.marks;
    });
  } else {
    student.subjects.forEach(subject => {
      totalObtainedMarks += subject.marks;
    });
  }

  const percentage = (totalObtainedMarks / totalMarks) * 100;
  const grade = calculateGrade(percentage);

  const results = `Total Marks: ${totalObtainedMarks} / ${totalMarks}\nPercentage: ${percentage.toFixed(2)}%\nGrade: ${grade}`;

  console.log(chalk.green(boxen(results, { padding: 1, margin: 1, borderStyle: 'round' })));
}

selectStudent();
