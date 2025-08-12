import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ViolationData {
  id?: string;
  type: string;
  description: string;
  date: string;
  location: string;
  suspectedPeople: string[];
  relevantPeople: string[];
  attachments: File[];
  status?: 'pending' | 'under_review' | 'resolved';
  submissionDate?: string;
  referenceNumber?: string;
}

interface ViolationState {
  currentViolation: ViolationData | null;
  violations: ViolationData[];
  submissionResult: {
    referenceNumber: string | null;
    isSubmitted: boolean;
  };
  loading: boolean;
}

const initialState: ViolationState = {
  currentViolation: null,
  violations: [],
  submissionResult: {
    referenceNumber: null,
    isSubmitted: false,
  },
  loading: false,
};

const violationSlice = createSlice({
  name: 'violation',
  initialState,
  reducers: {
    setCurrentViolation: (state, action: PayloadAction<ViolationData>) => {
      state.currentViolation = action.payload;
    },
    setViolations: (state, action: PayloadAction<ViolationData[]>) => {
      state.violations = action.payload;
    },
    addViolation: (state, action: PayloadAction<ViolationData>) => {
      state.violations.push(action.payload);
    },
    setSubmissionResult: (state, action: PayloadAction<{ referenceNumber: string }>) => {
      state.submissionResult = {
        referenceNumber: action.payload.referenceNumber,
        isSubmitted: true,
      };
    },
    clearSubmissionResult: (state) => {
      state.submissionResult = {
        referenceNumber: null,
        isSubmitted: false,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCurrentViolation,
  setViolations,
  addViolation,
  setSubmissionResult,
  clearSubmissionResult,
  setLoading,
} = violationSlice.actions;
export default violationSlice.reducer;