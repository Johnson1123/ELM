import { ICourse } from "@/app/components/CourseCard";
import {} from "react";

interface workFlow {
  title: string;
  content: string;
}
export const workFlow: Array<workFlow> = [
  {
    title: "Find Your Course",
    content:
      "Explore a diverse range of courses tailored to your interests and goals with our 'Find Your Course' feature. Discover the perfect educational path for you on our website, making your learning journey seamless and personalized.",
  },
  {
    title: "Book Your Seat",
    content:
      "Reserve your seat with just a few clicks, guaranteeing a seamless experience as you plan and attend exciting gatherings through our user-friendly booking system.",
  },
  {
    title: "Instant Certified",
    content:
      "Elevate your credentials effortlessly, as our platform delivers swift and accredited certification to acknowledge your skills and accomplishments in real-time.",
  },
];

export const courses = [
  {
    title: "Java programming A-Z fully classes with full task",
    price: 120000,
    modules: 27,
    students: 40,
    tags: "UI/UX",
    image: "../../asset/images/courses1.jpg",
    review: {
      total: 400,
      average: 90,
    },
  },
  {
    title: "Python Crash Course",
    price: 150000,
    modules: 27,
    students: 40,
    tags: "Programming",
    image: "../../asset/images/courses2.jpg",
    review: {
      total: 400,
      average: 4.5,
    },
  },
  {
    title: "Javascript Crash Course",
    price: 150000,
    modules: 27,
    students: 40,
    tags: "Programming",
    image: "../../asset/images/courses3.jpg",
    review: {
      total: 400,
      average: 4.5,
    },
  },
  {
    title: "Html, Css, Tailwind and Sass Crash Course",
    price: 100000,
    modules: 27,
    students: 40,
    tags: "Programming",
    image: "../../asset/images/courses4.jpg",
    review: {
      total: 400,
      average: 4.5,
    },
  },
  {
    title: "Cyber Security",
    price: 100000,
    modules: 27,
    students: 40,
    tags: "Programming",
    image: "../../asset/images/courses5.jpg",
    review: {
      total: 400,
      average: 4.5,
    },
  },
];

export const Feedback: any = [
  {
    content:
      "I appreciate the effort you've put into creating this learning platform, and I believe addressing these points could make it an even more effective tool for aspiring programmers.",
    course: "JavaScript Crash course",
    user: {
      name: "Osin Olawale",
      state: "Lagos",
      country: "Nigeria",
    },
  },
  {
    content:
      "I appreciate the effort you've put into creating this learning platform, and I believe addressing these points could make it an even more effective tool for aspiring programmers.",
    user: {
      name: "Onah Pius",
      state: "Oyo",
      country: "Nigeria",
    },
    course: "JavaScript Crash course",
  },
];

const clientID =
  "1057058043350-uec578tpn5hobe4eg34jtfqgd7vk5gep.apps.googleusercontent.com";
const clientSecret = "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";
