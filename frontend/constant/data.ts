export const JavaScript = [
  {
    title: "Introduction to JavaScript",
    modules: [
      {
        title: "Overview of Content Item",
        duration: 108000,
        authur: "Johnson Onifade",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4",
      },
      {
        title: "JavaScript and Syntax",
        duration: 308000,
        authur: "Emmauel Peace",
        url: "https://www.youtube.com/watch?v=YLslsZuEaNE&pp=ygUOMSBtaW51dGUgdmlkZW8%3D",
      },
      {
        title: "Data type in JavaScript",
        duration: 457000,
        authur: "Emmauel Peace",
        url: "https://www.youtube.com/watch?v=F7PxEy5IyV4",
      },
      {
        title: "Object and its Methods",
        duration: 205000,
        authur: "Musa Command",
        url: "https://www.youtube.com/watch?v=zBjJUV-lzHo",
      },
      {
        title: "Introduction to Array",
        duration: 108000,
        authur: "Musa Command",
        url: "https://www.youtube.com/watch?v=w7qr3bNSVJA",
      },
    ],
  },
  {
    title: "JavaScript Function",
    modules: [
      {
        title: "Function and its use",
        duration: 108000,
        authur: "Johnson Onifade",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4",
      },
      {
        title: "Operators in JavaScript",
        duration: 308000,
        authur: "Emmauel Peace",
        url: "https://www.youtube.com/watch?v=YLslsZuEaNE&pp=ygUOMSBtaW51dGUgdmlkZW8%3D",
      },
      {
        title: "Data type in JavaScript",
        duration: 457000,
        authur: "Emmauel Peace",
        url: "https://www.youtube.com/watch?v=F7PxEy5IyV4",
      },
      {
        title: "Object and its Methods",
        duration: 205000,
        authur: "Musa Command",
        url: "https://www.youtube.com/watch?v=zBjJUV-lzHo",
      },
      {
        title: "Introduction to Array",
        duration: 108000,
        authur: "Musa Command",
        url: "https://www.youtube.com/watch?v=w7qr3bNSVJA",
      },
    ],
  },
];

export const course = {
  name: "Introduction to JavaScript",
  description:
    "Introduction to JavaSCript a course made to guide and help everyone that wants to start career in JavaScript, its address all the basic of Javascript",
  price: 500,
  estimatedPrice: 450,
  thumbnail: {
    public_id: "",
    tags: "JavaScript",
    url: "",
  },
  level: "Introductionv",
  demoUrl: "",
  benefits: [
    {
      title: "Good In Insight on Javascript",
    },
  ],
  perequisite: [
    {
      title: "html, css",
    },
  ],
  purchase: 200,
  rating: 4.5,
  review: {
    user: "6576a85a166fc49733d3a95f",
    rating: 4.5,
    comment: "This course have change my",
    reviewReplies: {
      user: "6576a85a166fc49733d3a95f",
      question: "total Duration of the course",
    },
  },
  courseData: [
    {
      videoLenght: 308000,
      videoPlayer: "mp4",
      videoSection: "2",
      description: "introduction to Variable",
      videoUrl: "",
      title: "Javascript Variable",
      link: [{ title: "const varible", url: "" }],
      suggestion: "Varible, Introduction to varible",
      questions: [
        {
          user: "6576a85a166fc49733d3a95f",
          question: "Hello oo",
          questionReplies: ["object"],
        },
      ],
    },
    {
      videoLenght: 20000,
      videoPlayer: "mp4",
      videoSection: "1",
      description: "introduction to function",
      videoUrl: "",
      title: "Javascript Variable",
      link: [{ title: "const varible", url: "" }],
      suggestion: "Varible, Introduction to varible",
      questions: [
        {
          user: "6576a85a166fc49733d3a95f",
          question: "Hello oo",
          questionReplies: ["object"],
        },
      ],
    },
    {
      videoLenght: 30000,
      videoPlayer: "mp4",
      videoSection: "1",
      description: "introduction to araay",
      videoUrl: "",
      title: "Javascript Variable",
      link: [{ title: "const varible", url: "" }],
      suggestion: "Varible, Introduction to varible",
      questions: [
        {
          user: "6576a85a166fc49733d3a95f",
          question: "Hello oo",
          questionReplies: ["object"],
        },
      ],
    },
  ],
};

export const navItem = [
  {
    name: "Courses",
    url: "/course-page",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Blog",
    url: "/blog",
  },
  {
    name: "Contact",
    url: "/contact",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

export const getCompanyName = () => {
  return "JohnsonTech";
};

export const getEnvironment = () => {
  switch (process.env.NEXT_NODE_APP) {
    case "development":
      return "http://localhost:3000";
      break;
    case "Production":
      return "https://orender";
      break;
    case "test":
      return "http://hello";
      break;
  }
};
