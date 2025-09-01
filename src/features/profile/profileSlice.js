import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  totalSteps: 4,
  isModalOpen: false,
  isSubmitting: false,
  formData: {
    // Step 1: Photos
    photos: [],
    
    // Step 2: About You
    gender: '',
    type: '',
    distance: 80,
    aboutYou: '',
    
    // Step 3: Interests
    interests: [],
    personalityTags: [],
    
    // Step 4: Quiz
    quizAnswers: {
      recharge: '',
      datePlanning: '',
      newCuisines: ''
    }
  },
  errors: {}
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    openProfileModal: (state) => {
      state.isModalOpen = true;
    },
    closeProfileModal: (state) => {
      state.isModalOpen = false;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    addPhoto: (state, action) => {
      state.formData.photos.push(action.payload);
    },
    removePhoto: (state, action) => {
      state.formData.photos = state.formData.photos.filter(
        photo => photo.id !== action.payload
      );
    },
    addInterest: (state, action) => {
      if (!state.formData.interests.includes(action.payload)) {
        state.formData.interests.push(action.payload);
      }
    },
    removeInterest: (state, action) => {
      state.formData.interests = state.formData.interests.filter(
        interest => interest !== action.payload
      );
    },
    addPersonalityTag: (state, action) => {
      if (!state.formData.personalityTags.includes(action.payload)) {
        state.formData.personalityTags.push(action.payload);
      }
    },
    removePersonalityTag: (state, action) => {
      state.formData.personalityTags = state.formData.personalityTags.filter(
        tag => tag !== action.payload
      );
    },
    updateQuizAnswer: (state, action) => {
      const { question, answer } = action.payload;
      state.formData.quizAnswers[question] = answer;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    resetProfileForm: () => initialState
  }
});

export const {
  openProfileModal,
  closeProfileModal,
  setCurrentStep,
  nextStep,
  prevStep,
  updateFormData,
  addPhoto,
  removePhoto,
  addInterest,
  removeInterest,
  addPersonalityTag,
  removePersonalityTag,
  updateQuizAnswer,
  setErrors,
  setSubmitting,
  resetProfileForm
} = profileSlice.actions;

export default profileSlice.reducer;

