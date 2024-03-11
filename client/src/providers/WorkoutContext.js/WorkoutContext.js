import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        ...state,
        workouts: action.payload,
      };
    case "CREATE_WORKOUT": {
      return { ...state, workouts: [action.payload, ...state.workouts] };
    }
    case "DELETE_WORKOUT": {
      return {
        ...state,
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id,
        ),
      };
    }
    case "TOGGLE_POPUP": {
      return { ...state, popup: !state.popup };
    }
    case "EDIT_WORKOUT": {
      let currentWorkout = state.workouts.find(
        (workout) => workout._id === action.payload._id,
      );

      currentWorkout = { ...action.payload };

      return {
        ...state,
        workouts: [...state.workouts, currentWorkout],
      };
    }
    default:
      return state;
  }
};

const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
    popup: false,
  });

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContextProvider;
