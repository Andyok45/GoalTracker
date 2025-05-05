"use client";
import React, { useEffect, useRef } from 'react'
import { GiStairsGoal } from "react-icons/gi";
import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

interface Milestone {
  text: string;
  completed: boolean;
}

interface GoalData {
  id: number;
  title: string;
  description: string;
  group: string;
  milestones: Milestone[];
  comments: Comment[];
}

interface Comment {
  id: number;
  text: string;
  timestamp: string;
}


const initialGoals: GoalData[] = [
  {
    id: 1,
    title: "Team Analytics Tool",
    description: "Track progress and feedback for the analytics dashboard project.",
    group: "Team Alpha",
    milestones: [
      { text: "Initial planning", completed: false },
      { text: "Backend integration", completed: false },
      { text: "Launch beta", completed: false }
    ],
    comments: []
  },
  {
    id: 2,
    title: "Personal Fitness",
    description: "Achieve fitness goals and maintain a healthy lifestyle.",
    group: "Personal",
    milestones: [
      { text: "Join a gym", completed: false },
      { text: "Complete 10 workouts", completed: false },
      { text: "Run a 5K", completed: false }
    ],
    comments: []
  },
  {
    id: 3,
    title: "Personal Fitness",
    description: "Achieve fitness goals and maintain a healthy lifestyle.",
    group: "Personal",
    milestones: [
      { text: "Join a gym", completed: false },
      { text: "Complete 10 workouts", completed: false },
      { text: "Run a 5K", completed: false }
    ],
    comments: []
  },
  {
    id: 4,
    title: "Personal Fitness",
    description: "Achieve fitness goals and maintain a healthy lifestyle.",
    group: "Personal",
    milestones: [
      { text: "Join a gym", completed: false },
      { text: "Complete 10 workouts", completed: false },
      { text: "Run a 5K", completed: false }
    ],
    comments: []
  },
  {
    id: 5,
    title: "Personal Fitness",
    description: "Achieve fitness goals and maintain a healthy lifestyle.",
    group: "Personal",
    milestones: [
      { text: "Join a gym", completed: false },
      { text: "Complete 10 workouts", completed: false },
      { text: "Run a 5K", completed: false }
    ],
    comments: []
  },
  {
    id: 6,
    title: "Personal Fitness",
    description: "Achieve fitness goals and maintain a healthy lifestyle.",
    group: "Personal",
    milestones: [
      { text: "Join a gym", completed: false },
      { text: "Complete 10 workouts", completed: false },
      { text: "Run a 5K", completed: false }
    ],
    comments: []
  },
  {
    id: 7,
    title: "Personal Fitness",
    description: "Achieve fitness goals and maintain a healthy lifestyle.",
    group: "Personal",
    milestones: [
      { text: "Join a gym", completed: false },
      { text: "Complete 10 workouts", completed: false },
      { text: "Run a 5K", completed: false }
    ],
    comments: []
  },
  {
    id: 8,
    title: "Personal Fitness",
    description: "Achieve fitness goals and maintain a healthy lifestyle.",
    group: "Personal",
    milestones: [
      { text: "Join a gym", completed: false },
      { text: "Complete 10 workouts", completed: false },
      { text: "Run a 5K", completed: false }
    ],
    comments: []
  }
];

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalId: number;
  comments: Comment[];
  onAddComment: (goalId: number, comment: string) => void;
  darkMode: boolean;
}

// ------------------------------------------------------------------ //
function CommentsModal({ isOpen, onClose, goalId, comments, onAddComment, darkMode }: CommentsModalProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [comments]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(goalId, newComment);
      setNewComment("");
    }
  };

  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div onClick={(e) => e.stopPropagation()} className={`rounded-lg p-6 w-full max-w-md transition-colors ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Comments</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className={`overflow-y-auto mb-4 flex-1 max-h-96 pr-1 ${
            darkMode ? "scrollbar-thumb-gray-600" : "scrollbar-thumb-gray-400"
          }`}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className={`p-3 rounded mb-2 ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}>
                <div className='w-full break-words'>
                  <p className="text-sm whitespace-pre-wrap">{comment.text}</p>
                </div>

                <p className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}>{comment.timestamp}</p>
              </div>
            ))
          ) : (
            <p className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>No comments yet.</p>
          )}
         <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className={`flex-1 border p-2 rounded-l outline-none transition ${
                darkMode
                  ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  : "bg-white border-gray-300 placeholder-gray-500 text-black"
              }`}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ //
interface GoalCardProps {
  id: number;
  title: string;
  description: string;
  group: string;
  milestones: Milestone[];
  comments?: Comment[];
  onDelete: (id: number) => void;
  onCommentClick: (id: number) => void;
  onEditClick: (id: number) => void; // New prop
  darkMode: boolean;
  onToggleMilestone: (goalId: number, milestoneIndex: number) => void;
}



// ---------------------------------------------------------------------- //
function GoalCard({
  id,
  title,
  description,
  group,
  milestones,
  onDelete,
  onCommentClick,
  darkMode,
  onToggleMilestone,
  onEditClick
}: GoalCardProps) {
  // Remove the local checked state completely
  // The checkboxes will now use milestone.completed directly

  const handleMilestoneToggle = (index: number) => {
    onToggleMilestone(id, index);

    // Trigger confetti effect when completing a milestone
    if (!milestones[index].completed) {
      // Simple celebration effect
      const element = document.getElementById(`milestone-${id}-${index}`);
      if (element) {
        element.classList.add('pulse-animation');
        setTimeout(() => {
          element.classList.remove('pulse-animation');
        }, 700);
      }
    }
  };

  const handleDelete = (): void => {
    onDelete(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      onClick={onEditClick.bind(null, id)}
      className={`shadow-md rounded-xl p-6 w-full h-[370px] flex flex-col justify-between relative transition-colors ${
        darkMode ? "bg-slate-600 text-white" : "bg-white text-black"
      } hover:shadow-xl`}
    >
      {/* Group Label */}
      <span
        className={`absolute top-4 right-4 text-sm px-2 py-1 rounded ${
          darkMode
            ? "bg-blue-900 text-blue-200"
            : "bg-blue-100 text-blue-600"
        }`}
      >
        {group}
      </span>

      {/* Title and Description */}
      <div className="mb-2">
        <h2
          className={`text-xl font-semibold mb-1 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>
        <div
          className={`text-sm h-[50px] overflow-y-auto pr-1 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </div>
      </div>

      {/* Milestones List - Now using milestone.completed directly */}
      <div className="overflow-y-auto flex-1 pr-1 my-2">
        <ul onClick={(e) => e.stopPropagation()} className="space-y-2">
          {milestones.map((milestone, index) => (
            <li key={index} className="flex items-start gap-2" id={`milestone-${id}-${index}`}>
              <input
                type="checkbox"
                checked={milestone.completed}
                onChange={() => handleMilestoneToggle(index)}
                className="mt-1 w-4 h-4"
              />
              <span
                className={`text-sm ${
                  milestone.completed
                    ? "line-through text-gray-400"
                    : darkMode
                    ? "text-gray-100"
                    : "text-gray-800"
                }`}
              >
                {milestone.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer - Count completed milestones directly */}
      <hr className={`my-2 ${darkMode ? "border-gray-500" : ""}`} />
      <div className="flex justify-between items-center mt-2">
        <div className="w-[65%]">
          <p className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-500"} mb-1`}>
            {milestones.filter(m => m.completed).length} of {milestones.length} completed
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(milestones.filter(m => m.completed).length / milestones.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-blue-500 h-1.5 rounded-full"
            />
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()} className="flex gap-3">
          <button
            title="Comment"
            onClick={() => onCommentClick(id)}
            className="hover:scale-110 transition-transform duration-150"
          >
            💬
          </button>
          <button
            title="Delete"
            onClick={handleDelete}
            className="hover:scale-110 transition-transform duration-150 text-red-500 opacity-70 hover:opacity-100"
          >
            🗑️
          </button>
        </div>
      </div>
    </motion.div>
  );

}

// ------------------------------------------------------------------ //

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goal: GoalData) => void;
  darkMode: boolean;
  editingGoal: GoalData | null;
  onUpdateGoal?: (goal: GoalData) => void;
  allGoals?: GoalData[];
}

// ------------------------------------------------------------------ //

function AddGoalModal({ isOpen, onClose, onAddGoal, darkMode, editingGoal, onUpdateGoal, allGoals }: AddGoalModalProps) {
  const [newGoal, setNewGoal] = React.useState<Omit<GoalData, 'id'>>({
    title: "",
    description: "",
    group: "",
    milestones: [{ text: "", completed: false }],
    comments: []
  });

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const isEditMode = Boolean(editingGoal);
  const [customGroup, setCustomGroup] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<string>("");

    // Get unique groups from all goals
    const existingGroups = React.useMemo(() => {
      const groups = new Set<string>();
      allGoals?.forEach(goal => {
        if (goal.group) groups.add(goal.group);
      });
      return Array.from(groups);
    }, [allGoals]);

  // Reset form when modal is opened or when editingGoal changes
  React.useEffect(() => {
    if (isOpen) {
      if (editingGoal) {
        setNewGoal(editingGoal);
        setSelectedGroup(editingGoal.group);
        setCustomGroup(!existingGroups.includes(editingGoal.group));
      } else {
        setNewGoal({
          title: "",
          description: "",
          group: "",
          milestones: [{ text: "", completed: false }],
          comments: []
        });
        setSelectedGroup("");
        setCustomGroup(false);
      }
    }
  }, [isOpen, editingGoal, existingGroups]);

    // Update newGoal when selectedGroup changes
    React.useEffect(() => {
      if (!customGroup) {
        setNewGoal(prev => ({ ...prev, group: selectedGroup }));
      }
    }, [selectedGroup, customGroup]);

    const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const value = e.target.value;
      if (value === "custom") {
        setCustomGroup(true);
        setNewGoal(prev => ({ ...prev, group: "" }));
      } else {
        setCustomGroup(false);
        setSelectedGroup(value);
      }
    };

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const focusable = dialogRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setNewGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleMilestoneChange = (index: number, value: string): void => {
    const updatedMilestones = [...newGoal.milestones];
    updatedMilestones[index] = { text: value, completed: false };
    setNewGoal(prev => ({ ...prev, milestones: updatedMilestones }));
  };

  const addMilestone = (): void => {
    setNewGoal(prev => ({
      ...prev,
      milestones: [...prev.milestones, { text: "", completed: false }]
    }));
  };

  const removeMilestone = (index: number): void => {
    if (newGoal.milestones.length > 1) {
      const updatedMilestones = newGoal.milestones.filter((_, i) => i !== index);
      setNewGoal(prev => ({ ...prev, milestones: updatedMilestones }));
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const filteredMilestones = newGoal.milestones.filter(m => m.text.trim() !== "");
    if (isEditMode && editingGoal && onUpdateGoal) {
      // Update existing goal
      onUpdateGoal({
        ...newGoal,
        id: editingGoal.id,
        milestones: filteredMilestones.length > 0 ? filteredMilestones : [{ text: "New milestone", completed: false }]
      } as GoalData);
    } else {
      // Add new goal
      onAddGoal({
        ...newGoal,
        id: Date.now(),
        milestones: filteredMilestones.length > 0 ? filteredMilestones : [{ text: "New milestone", completed: false }]
      } as GoalData);
    }

    onClose();
  };

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className={`rounded-lg p-6 w-full max-w-md transition-colors ${
          darkMode ? "bg-slate-700 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Goal" : "Add New Goal"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={newGoal.title}
              onChange={handleChange}
              className={`w-full rounded p-2 border ${
                darkMode ? "bg-slate-800 border-gray-500 text-white" : "border-gray-300"
              }`}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={newGoal.description}
              onChange={handleChange}
              rows={3}
              required
              className={`w-full rounded p-2 border ${
                darkMode ? "bg-slate-800 border-gray-500 text-white" : "border-gray-300"
              }`}
            ></textarea>
          </div>

          <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Group</label>
        <div className="flex gap-2">
          <select
            value={customGroup ? "custom" : selectedGroup}
            onChange={handleGroupChange}
            className={`w-full rounded p-2 border ${
              darkMode ? "bg-slate-800 border-gray-500 text-white" : "border-gray-300"
            }`}
          >
            <option value="" disabled>Select a group</option>
            {existingGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
            <option value="custom">+ Add new group</option>
          </select>
        </div>

        {customGroup && (
          <input
            type="text"
            name="group"
            value={newGoal.group}
            onChange={handleChange}
            placeholder="Enter new group name"
            className={`w-full rounded p-2 border mt-2 ${
              darkMode ? "bg-slate-800 border-gray-500 text-white" : "border-gray-300"
            }`}
            required
          />
        )}
      </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Milestones</label>
            {newGoal.milestones.map((milestone, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={milestone.text}
                  onChange={(e) => handleMilestoneChange(index, e.target.value)}
                  className={`flex-1 rounded p-2 border ${
                    darkMode ? "bg-slate-800 border-gray-500 text-white" : "border-gray-300"
                  }`}
                  placeholder="Enter milestone"
                />
                <button
                  type="button"
                  onClick={() => removeMilestone(index)}
                  className={`ml-2 px-2 py-1 rounded ${
                    darkMode
                      ? "bg-red-900 text-red-300"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMilestone}
              className={`text-sm mt-1 ${
                darkMode ? "text-blue-300" : "text-blue-500"
              }`}
            >
              + Add Another Milestone
            </button>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 border rounded ${
                darkMode ? "border-gray-400 text-white" : "border-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isEditMode ? "Update Goal" : "Add Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



// ------------------------------------------------------------------ //
function GoalTracker(): React.JSX.Element {

  const [darkMode, setDarkMode] = React.useState<boolean>(false);
  const [sideBarOpen, setSideBarOpen] = React.useState<boolean>(true);
  const [goals, setGoals] = React.useState<GoalData[]>(initialGoals);
  const [showAddModal, setShowAddModal] = React.useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [activeCommentGoalId, setActiveCommentGoalId] = useState<number | null>(null);
  const [editingGoal, setEditingGoal] = useState<GoalData | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchFocused, setSearchFocused] = useState<boolean>(false);

    // Custom CSS styles for animations
    useEffect(() => {
      // Add the styles to the document head
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); background-color: rgba(59, 130, 246, 0.1); }
          100% { transform: scale(1); }
        }

        .pulse-animation {
          animation: pulse 0.7s ease-in-out;
        }

        /* Improved scrollbar for dark/light mode */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: ${darkMode ? '#2d3748' : '#f1f1f1'};
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#4a5568' : '#c1c1c1'};
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#718096' : '#a0aec0'};
        }

        /* Smooth transitions */
        .card-transition {
          transition: all 0.3s ease;
        }

        /* Focus animation for search */
        .search-focus {
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }
      `;
      document.head.appendChild(styleElement);

      return () => {
        document.head.removeChild(styleElement);
      };
    }, [darkMode]);


    // Search function that prioritizes title matches then description matches
    const SearchGoals = React.useMemo(() => {
      let filtered = goals;

      // First apply category filter if selected
      if (selectedCategory) {
        filtered = filtered.filter(goal => goal.group === selectedCategory);
      }

      // Then apply search term if present
      if (searchTerm.trim()) {
        const normalizedSearchTerm = searchTerm.toLowerCase().trim();

        // Filter goals where either title or description contains the search term
        filtered = filtered.filter(goal =>
          goal.title.toLowerCase().includes(normalizedSearchTerm) ||
          goal.description.toLowerCase().includes(normalizedSearchTerm)
        );
      }

      return filtered;
    }, [goals, selectedCategory, searchTerm]);


      // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };


  const handleEditClick = (id: number): void => {
    const goalToEdit = goals.find(goal => goal.id === id);
    if (goalToEdit) {
      setEditingGoal(goalToEdit);
      setShowAddModal(true);
    }
  };


  const updateGoal = (updatedGoal: GoalData): void => {
    setGoals(goals.map(goal =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
  };



  const toggleMilestone = (goalId: number, milestoneIndex: number): void => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = [...goal.milestones];
        const wasCompleted = updatedMilestones[milestoneIndex].completed;
        updatedMilestones[milestoneIndex].completed = !wasCompleted;

        // Add completion date if being marked complete
        if (!wasCompleted) {
          // updatedMilestones[milestoneIndex].completedDate = new Date().toISOString();

          // Show confetti animation when completing a milestone
          const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
          // confetti({
          //   particleCount: 100,
          //   spread: 70,
          //   origin: { y: 0.6 },
          //   colors: colors
          // });
        }

        return { ...goal, milestones: updatedMilestones };
      }
      return goal;
    }));
  };


  const calculateCompletionPercentage = (goalsList: GoalData[]): number => {
    if (goalsList.length === 0) return 0;

    let totalMilestones = 0;
    let completedMilestones = 0;

    goalsList.forEach(goal => {
      totalMilestones += goal.milestones.length;
      completedMilestones += goal.milestones.filter(m => m.completed).length;
    });

    return Math.round((completedMilestones / totalMilestones) * 100) || 0;
  };

  // Get the appropriate percentage based on selected category
  const progressPercentage = selectedCategory
  ? calculateCompletionPercentage(goals.filter(goal => goal.group === selectedCategory))
  : calculateCompletionPercentage(goals);


  const addComment = (goalId: number, commentText: string): void => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          comments: [
            ...(goal.comments || []),
            {
              id: Date.now(),
              text: commentText,
              timestamp: new Date().toLocaleString()
            }
          ]
        };
      }
      return goal;
    }));
  };



  const handleCategorySelect = (category: string): void => {
      setSelectedCategory(selectedCategory === category ? null : category);
  };

  const filteredGoals = selectedCategory
  ? goals.filter(goal => goal.group === selectedCategory)
  : goals;

  // Calculate statistics for the sidebar
  const groupCounts: Record<string, number> = goals.reduce((acc, goal) => {
    acc[goal.group] = (acc[goal.group] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const deleteGoal = (id: number): void => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const addGoal = (newGoal: GoalData): void => {
    setGoals([...goals, newGoal]);
  };

  const toggleDarkMode = (): void => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className='w-screen h-screen flex flex-col'>
      {/* Navbar */}
      {/* Navbar */}
      <div className={`sticky top-0 z-30 backdrop-blur-lg bg-opacity-90 shadow-md items-center flex justify-between px-6 py-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className="flex items-center">
          <GiStairsGoal className="text-4xl text-blue-500" />
          <h1 className={`text-3xl ml-4 font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>Goal Tracker</h1>
        </div>

        <div className="hidden items-center space-x-4 lg:flex">
          <div className="relative">
            <input
              type="text"
              placeholder="Search goals by title or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`px-4 py-2 rounded-lg w-[400px] ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} focus:outline-none transition-all duration-300 ${searchFocused ? 'search-focus ring-2 ring-blue-300 dark:ring-blue-600' : ''}`}
            />
            <motion.span
              animate={{
                scale: searchFocused || searchTerm ? 1.2 : 1,
                rotate: searchFocused ? [0, -10, 10, -10, 0] : 0
              }}
              transition={{ duration: 0.3 }}
              className="absolute right-3 top-2.5">
              🔍
            </motion.span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white text-sm transition-colors duration-200`}
          >
            Add Goal
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <motion.div
          initial={{ width: "25%" }}
          animate={{ width: sideBarOpen ? '25%' : '0%' }}
          transition={{ duration: 0.3 }}
          className={`w-64 lg:w-80 flex-shrink-0 ${darkMode ? "bg-gray-800 text-white" : "bg-white"} shadow-md z-20 flex flex-col relative`}
        >

          {/* Toggle Button */}
        <button
          className="absolute left-full top-1/2 transform -translate-y-1/2 z-30 bg-gray-300 dark:bg-gray-700 p-2 rounded-r-full hover:scale-110 transition"
          onClick={() => setSideBarOpen(!sideBarOpen)}
        >
          {sideBarOpen ? "←" : "→"}
        </button>

          {/* Sidebar Content */}
          <div className={`transition-opacity duration-300 ${
      sideBarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
            <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">My Dashboard</h2>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm`}>
              Track, manage, and achieve your goals
            </p>
          </div>

          <div className="mt-2 w-full p-4">
            <p className="text-sm font-medium mb-1">
              {selectedCategory ? `${selectedCategory} Progress` : 'Overall Progress'}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 text-gray-500">
              {progressPercentage}% of {selectedCategory ? `${selectedCategory}` : 'all'} goals completed
            </p>
          </div>

          <div className="mt-4 p-4">
            <h3 className="font-medium mb-2">Categories</h3>
            <ul className="space-y-1">
            {Object.entries(groupCounts).map(([group, count]) => (
                <motion.li
                  key={group}
                  whileHover={{ scale: 1.03, x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`flex items-center justify-between text-sm p-2 ${
                    selectedCategory === group
                      ? `${darkMode ? 'bg-blue-800 text-blue-100' : 'bg-blue-100 text-blue-700'}`
                      : `hover:bg-gray-100 dark:hover:bg-gray-700`
                  } rounded cursor-pointer transition-colors duration-200`}
                  onClick={() => handleCategorySelect(group)}
                >
                  <span>{group}</span>
                  <motion.span
                    initial={false}
                    animate={{
                      scale: selectedCategory === group ? 1.1 : 1
                    }}
                    className={`${selectedCategory === group ?
                      (darkMode ? 'bg-blue-600 text-blue-200' : 'bg-blue-500 text-white') :
                      'bg-blue-100 text-blue-600'
                    } px-2 py-0.5 rounded-full text-xs transition-colors duration-200`}
                  >
                    {count}
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </div>
          </div>



        </motion.div>



        {/* Right Content Area */}
        <div className={`flex-1 overflow-y-auto p-8 relative transition-all duration-300 ${
          darkMode ? 'bg-gray-900 text-white' : ''
        }`}>
          {searchTerm.trim() && (
            <div className="mb-4">
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Showing results for: "{searchTerm}"
                {searchTerm && (
                  <button
                    className="ml-2 text-blue-500 underline"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear search
                  </button>
                )}
              </p>
            </div>
          )}

          {SearchGoals.length === 0 ? (
            <div className="text-center py-10">
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                No goals found. {searchTerm ? "Try another search term." : "Add a new goal to get started!"}
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 transition-all duration-300 ${
              sideBarOpen
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3'
            }`}>
              {SearchGoals.map(goal => (
                <GoalCard
                  key={goal.id}
                  id={goal.id}
                  title={goal.title}
                  description={goal.description}
                  group={goal.group}
                  milestones={goal.milestones}
                  onDelete={deleteGoal}
                  comments={goal.comments || []}
                  onCommentClick={(id) => setActiveCommentGoalId(id)}
                  onEditClick={handleEditClick}
                  darkMode={darkMode}
                  onToggleMilestone={toggleMilestone}
                />
              ))}
            </div>
          )}
        </div>
      </div>

  {/* Footer */}
  <footer className="bg-gray-200 dark:bg-gray-800 text-center p-4">
    <p className="text-sm text-gray-600 dark:text-gray-300">
      © 2025 Your App. All rights reserved.
    </p>
  </footer>

      {/* Add Goal Modal - Update to pass all goals */}
      <AddGoalModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingGoal(null);
        }}
        onAddGoal={addGoal}
        onUpdateGoal={updateGoal}
        editingGoal={editingGoal}
        darkMode={darkMode}
        allGoals={goals}
      />

  {/* Comments Modal */}
      {activeCommentGoalId !== null && (
        <CommentsModal
          isOpen={activeCommentGoalId !== null}
          onClose={() => setActiveCommentGoalId(null)}
          goalId={activeCommentGoalId}
          comments={goals.find(g => g.id === activeCommentGoalId)?.comments || []}
          onAddComment={addComment}
          darkMode={darkMode}
        />
      )}
    </div>
  )
}

export default GoalTracker;
// ------------------------------------------------------------------ //




// function GoalCard({
//   title,
//   description,
//   group,
//   milestones,
// }: {
//   title: string;
//   description: string;
//   group: string;
//   milestones: string[];
// }) {
//   const [checked, setChecked] = React.useState<boolean[]>(new Array(milestones.length).fill(false));

//   const toggleCheck = (index: number) => {
//     const newChecked = [...checked];
//     newChecked[index] = !newChecked[index];
//     setChecked(newChecked);
//   };

//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 w-[600px] h-[370px] flex flex-col justify-between relative">
//       {/* Group Label */}
//       <span className="absolute top-4 right-4 bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded">
//         {group}
//       </span>

//       {/* Title and Description */}
//       <div className="mb-2">
//         <h2 className="text-xl font-semibold mb-1 text-gray-900">{title}</h2>
//         <div className="text-sm text-gray-600 h-[50px] overflow-y-auto pr-1">
//           {description}
//         </div>
//       </div>

//       {/* Milestones List */}
//       <div className="overflow-y-auto flex-1 pr-1 my-2">
//         <ul className="space-y-2">
//           {milestones.map((milestone, index) => (
//             <li key={index} className="flex items-start gap-2">
//               <input
//                 type="checkbox"
//                 checked={checked[index]}
//                 onChange={() => toggleCheck(index)}
//                 className="mt-1 w-4 h-4"
//                 value={
//                   checked[index]
//                     ? "Checked"
//                     : "Unchecked"
//                 }
//               />
//               <span className={`text-sm ${checked[index] ? "line-through text-gray-400" : "text-gray-800 "}`}>
//                 {milestone}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Footer */}
//       <hr className="my-2" />
//       <div className="flex justify-between items-center mt-2">
//         <p className="text-gray-500 text-sm">
//           {checked.filter(Boolean).length} of {milestones.length} completed
//         </p>
//         <div className="flex gap-3">
//           <button title="Comment">💬</button>
//           <button title="Delete">🗑️</button>
//         </div>
//       </div>
//     </div>
//   );

  // return (
  //   <div className="bg-white shadow-md h-fit rounded-xl p-6 min-w-80 w-full max-w-md mx-auto relative">
  //     {/* Group label top-right */}
  //     <span className="absolute top-4 right-4 bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded">
  //       {group}
  //     </span>

  //     {/* Title and description */}
  //     <h2 className="text-xl font-semibold">{title}</h2>
  //     <p className="text-gray-600 mb-4">{description}</p>

  //     {/* Milestone checkboxes */}
  //     <ul className="space-y-2 mb-3">
  //       {milestones.map((milestone, index) => (
  //         <li key={index} className="flex items-center gap-2">
  //           <input
  //             type="checkbox"
  //             checked={checked[index]}
  //             onChange={() => toggleCheck(index)}
  //             className="w-4 h-4"
  //           />
  //           <span className={checked[index] ? "line-through text-gray-400" : ""}>
  //             {milestone}
  //           </span>
  //         </li>
  //       ))}
  //     </ul>

  //     <hr />

  //     <div className='flex justify-between mt-4'>
  //       <div>
  //         <p className="text-gray-500 text-sm ">
  //           {checked.filter(Boolean).length} of {milestones.length} milestones completed
  //         </p>
  //       </div>
  //       <div className='flex gap-3'>
  //           <p className='h-fit'><button>💬</button></p>
  //           <p className='h-fit'><button>🗑️</button></p>
  //       </div>
  //     </div>
  //   </div>
  // );
// }



// <div className="flex w-screen h-4/5 relative">

          {/* Sidebar */}
//           <motion.div
//               initial={{ x: 0 }}
//               animate={sideBarOpen ? { x: 0 } : { x: -400 }}
//               transition={{ duration: 0.5 }}
//               className={`absolute top-0 left-0 h-full w-[400px] z-20 ${
//                 darkMode ? "bg-gray-800 text-white" : "bg-white"
//               } p-4 shadow-md hidden xl:flex flex-col`}
//             >

//             <button
//             className="py-10 absolute left-[400px] top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-r-full z-30 hover:scale-110 transition hidden xl:block"
//             onClick={() => setSideBarOpen(!sideBarOpen)}
//             >
//             {sideBarOpen ? "←" : "→"}
//           </button>
//             <div>
//               <h2 className="text-2xl font-bold mb-2">My Goals Dashboard</h2>
//               <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
//                 Track, manage, and achieve your personal and professional goals
//               </p>
//             </div>

//             <div className="mt-2 w-full">
//               <p className="text-sm font-medium mb-1">Overall Progress</p>
//             </div>

//             <div className="mt-2 w-full">Chart</div>
//           </motion.div>

//           {/* Right Section */}
//           <div
//             className={`transition-all overflow-y-auto duration-500 p-4 ${
//               sideBarOpen ? "xl:pl-[330px]" : "xl:pl-[30px]"
//             }`}
//           >
//             <div className="flex flex-wrap gap-4 ">
//               <GoalCard
//                 title="Team Analytics Tool"
//                 description="Track progress and feedback for the analytics dashboard project."
//                 group="Team Alpha"
//                 milestones={["Initial planning", "Backend integration", "Launch beta", "Initial planning", "Backend integration", "Launch beta", "Initial planning", "Backend integration", "Launch beta"]}
//               />

//               <GoalCard
//                 title="Personal Fitness"
//                 description="Achieve fitness goals and maintain a healthy lifestyle."
//                 group="Personal"
//                 milestones={["Join a gym", "Complete 10 workouts", "Run a 5K"]}
//               />

//               <GoalCard
//                 title="Learning React"
//                 description="Master React and build a personal project."
//                 group="Personal"
//                 milestones={["Complete online course", "Build a simple app", "Deploy to GitHub"]}
//               />

//               <GoalCard
//                 title="Travel Plans"
//                 description="Plan and prepare for an upcoming trip."
//                 group="Personal"
//                 milestones={["Choose destination", "Book flights", "Create itinerary"]}
//               />

// <GoalCard
//                 title="Travel Plans"
//                 description="Plan and prepare for an upcoming trip."
//                 group="Personal"
//                 milestones={["Choose destination", "Book flights", "Create itinerary"]}
//               />

// <GoalCard
//                 title="Travel Plans"
//                 description="Plan and prepare for an upcoming trip."
//                 group="Personal"
//                 milestones={["Choose destination", "Book flights", "Create itinerary"]}
//               />

// <GoalCard
//                 title="Travel Plans"
//                 description="Plan and prepare for an upcoming trip."
//                 group="Personal"
//                 milestones={["Choose destination", "Book flights", "Create itinerary"]}
//               />

// <GoalCard
//                 title="Travel Plans"
//                 description="Plan and prepare for an upcoming trip."
//                 group="Personal"
//                 milestones={["Choose destination", "Book flights", "Create itinerary"]}
//               />
//             </div>
//           </div>
//         </div>





//         {/* */}
//         {/* Footer */}
//         <div className={`mt-auto py-6 px-6  ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
//           <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center">
//             <div className="mb-4 md:mb-0">
//               <p className="text-sm">© 2025 Goal Tracker. All rights reserved.</p>
//             </div>
//           </div>
//         </div>