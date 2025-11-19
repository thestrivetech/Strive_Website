import { Quiz } from './types';

export const computerVisionBasics: Quiz = {
  id: 9,
  title: "Computer Vision Basics",
  description: "Learn the fundamentals of computer vision, image processing, and visual AI applications.",
  topic: "Computer Vision",
  difficulty: "intermediate",
  timeLimit: 18,
  passingScore: 70,
  questions: [
    {
      id: 1,
      question: "What is computer vision?",
      options: [
        "A way to improve human eyesight",
        "A field of AI that enables computers to interpret and understand visual information",
        "Software for editing photos",
        "A type of virtual reality"
      ],
      correctAnswer: 1,
      explanation: "Computer vision is a field of artificial intelligence that trains computers to interpret and understand the visual world, enabling machines to identify and analyze visual content.",
      difficulty: "intermediate"
    },
    {
      id: 2,
      question: "What does CNN stand for in computer vision?",
      options: [
        "Computer Network Node",
        "Convolutional Neural Network",
        "Central Navigation Network",
        "Cloud Native Network"
      ],
      correctAnswer: 1,
      explanation: "CNN stands for Convolutional Neural Network, a deep learning architecture particularly effective for processing and analyzing visual imagery.",
      difficulty: "intermediate"
    },
    {
      id: 3,
      question: "What is image classification in computer vision?",
      options: [
        "Organizing photos by file size",
        "Determining what objects or scenes are present in an image",
        "Converting images to black and white",
        "Compressing image files"
      ],
      correctAnswer: 1,
      explanation: "Image classification is the task of categorizing an entire image into one or more predefined classes, such as identifying whether an image contains a cat, dog, or car.",
      difficulty: "intermediate"
    },
    {
      id: 4,
      question: "Which of these is a common application of computer vision?",
      options: [
        "Calculating math equations",
        "Facial recognition systems",
        "Playing music files",
        "Sending emails"
      ],
      correctAnswer: 1,
      explanation: "Facial recognition systems use computer vision to detect, analyze, and identify human faces in digital images or video streams, making it a prominent application of the technology.",
      difficulty: "intermediate"
    },
    {
      id: 5,
      question: "What is object detection different from image classification?",
      options: [
        "Object detection is faster than image classification",
        "Object detection finds and locates multiple objects within an image, while classification identifies what's in the whole image",
        "Object detection only works with photos, not videos",
        "Object detection is only used for medical images"
      ],
      correctAnswer: 1,
      explanation: "Object detection not only identifies what objects are in an image but also determines where they are located, often with bounding boxes, while classification simply categorizes the entire image.",
      difficulty: "intermediate"
    }
  ]
};