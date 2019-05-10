import { Injectable } from '@angular/core';
import { Exercise } from './training/exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();

  private exercise: Exercise;
  private exercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    { id: 'standing-bow', name: 'Standing Bow', duration: 200, calories: 20 },
  ];
  private exercisesDone: Exercise[] = [];

  get availableExercises() {
    return this.exercises.slice(); // returns a new array created from an instance of this.exercises.
  }

  get runningExercise() {
    return { ...this.exercise };
  }

  get doneExercises() {
    return this.exercisesDone.slice();
  }

  constructor() {}

  startExercise(selectedId: string) {
    this.exercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.exercise });
  }

  completeExercise() {
    this.exercisesDone.push({ ...this.exercise, date: new Date(), state: 'completed' });
    this.exercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercisesDone.push({
      ...this.exercise,
      duration: (this.exercise.duration * progress) / 100,
      calories: (this.exercise.calories * progress) / 100,
      date: new Date(),
      state: 'canceled',
    });
    this.exercise = null;
    this.exerciseChanged.next(null);
  }
}
