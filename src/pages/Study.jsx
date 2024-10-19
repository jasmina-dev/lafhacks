import * as React from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import StudyGuide from "../components/StudyGuide";

export default function StudyPage() {
  let { id } = useParams();
  const [study, setStudy] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      // const response = await axiosInstance.get(`/study/${id}`);
      // console.log(response);
      setStudy({
        body: `# Study Guide

This study guide is organized into key sections to help you understand the essential concepts for your subject. Each section includes definitions, examples, and important tips.

## Table of Contents
1. [Key Concepts](#key-concepts)
2. [Formulas and Equations](#formulas-and-equations)
3. [Important Definitions](#important-definitions)
4. [Examples and Practice Problems](#examples-and-practice-problems)
5. [Tips for Success](#tips-for-success)
6. [Additional Resources](#additional-resources)

---

## Key Concepts

### 1.1 Concept A: **Definition**
- Explain the concept clearly.
- Mention any important conditions or prerequisites.

**Example**: Provide an example or scenario that helps illustrate the concept.

### 1.2 Concept B: **Definition**
- Expand on the next key idea.
- Highlight how it relates to Concept A.

**Tip**: Mention any pitfalls or common mistakes students make when learning this concept.

---

## Formulas and Equations

### 2.1 Formula A`,
      });
      console;
    };

    fetchData();
  }, [id]);

  return (
    <div>
      Study Page: {id}
      <StudyGuide body={study.body} />
    </div>
  );
}
