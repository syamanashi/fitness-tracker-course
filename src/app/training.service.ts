import { Injectable } from '@angular/core';
import { Exercise } from './training/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private exercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    { id: 'standing-bow', name: 'Standing Bow', duration: 200, calories: 20 },
  ];

  get availableExercises() {
    return this.exercises.slice(); // returns a new array created from an instance of this.exercises.
  }

  constructor() {}
}
