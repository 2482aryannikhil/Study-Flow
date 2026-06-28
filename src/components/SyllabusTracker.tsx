import { useEffect, useState } from "react";
import { Chapter } from "../types/tracker";
import { Subject } from "../types/subject";
import { FiTrash2, FiChevronDown, FiChevronRight } from "react-icons/fi";

function SyllabusTracker() {
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const saved = localStorage.getItem("tracker");
    return saved ? JSON.parse(saved) : [];
  });

  const [expanded, setExpanded] = useState<number[]>([]);

  const [inputs, setInputs] = useState({
    Mathematics: "",
    Physics: "",
    Chemistry: "",
  });

  useEffect(() => {
    localStorage.setItem("tracker", JSON.stringify(chapters));
  }, [chapters]);

  function addChapter(subject: Subject) {
    const title = inputs[subject].trim();

    if (!title) return;

    setChapters([
      ...chapters,
      {
        id: Date.now(),
        title,
        subject,
        lectures: false,
        module: false,
        pyqs: false,
        sidebook: false,
        revision: false,
      },
    ]);

    setInputs({
      ...inputs,
      [subject]: "",
    });
  }

  function deleteChapter(id: number) {
    setChapters(chapters.filter((c) => c.id !== id));
  }

  function toggleExpand(id: number) {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter((item) => item !== id));
    } else {
      setExpanded([...expanded, id]);
    }
  }

  function toggleCheckpoint(
    id: number,
    field: "lectures" | "module" | "pyqs" | "sidebook" | "revision"
  ) {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === id
          ? {
              ...chapter,
              [field]: !chapter[field],
            }
          : chapter
      )
    );
  }

  function getProgress(chapter: Chapter) {
    const completed = [
      chapter.lectures,
      chapter.module,
      chapter.pyqs,
      chapter.sidebook,
      chapter.revision,
    ].filter(Boolean).length;

    return completed * 20;
  }

  return (
    <div>
      <h1>📚 Syllabus Tracker</h1>

      {(["Mathematics", "Physics", "Chemistry"] as Subject[]).map((subject) => (
        <div key={subject} className="monthly-section">
          <h2>{subject}</h2>

          <div className="monthly-input">
            <input
              placeholder="Add chapter..."
              value={inputs[subject]}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  [subject]: e.target.value,
                })
              }
            />

            <button onClick={() => addChapter(subject)}>➕ Add</button>
          </div>

          {chapters
            .filter((chapter) => chapter.subject === subject)
            .map((chapter) => (
              <div key={chapter.id} className="tracker-card">
                <div className="tracker-header">
                  <div
                    className="tracker-title"
                    onClick={() => toggleExpand(chapter.id)}
                  >
                    {expanded.includes(chapter.id) ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}

                    <strong>{chapter.title}</strong>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => deleteChapter(chapter.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>

                {expanded.includes(chapter.id) && (
                  <div className="tracker-body">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${getProgress(chapter)}%`,
                        }}
                      />
                    </div>

                    <p className="progress-text">
                      {getProgress(chapter)}% Complete
                    </p>

                    <label className="checkpoint">
                      <input
                        type="checkbox"
                        checked={chapter.lectures}
                        onChange={() =>
                          toggleCheckpoint(chapter.id, "lectures")
                        }
                      />
                      Lectures
                    </label>

                    <label className="checkpoint">
                      <input
                        type="checkbox"
                        checked={chapter.module}
                        onChange={() => toggleCheckpoint(chapter.id, "module")}
                      />
                      Module
                    </label>

                    <label className="checkpoint">
                      <input
                        type="checkbox"
                        checked={chapter.pyqs}
                        onChange={() => toggleCheckpoint(chapter.id, "pyqs")}
                      />
                      PYQs
                    </label>

                    <label className="checkpoint">
                      <input
                        type="checkbox"
                        checked={chapter.sidebook}
                        onChange={() =>
                          toggleCheckpoint(chapter.id, "sidebook")
                        }
                      />
                      Sidebook
                    </label>

                    <label className="checkpoint">
                      <input
                        type="checkbox"
                        checked={chapter.revision}
                        onChange={() =>
                          toggleCheckpoint(chapter.id, "revision")
                        }
                      />
                      Revision
                    </label>
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default SyllabusTracker;
