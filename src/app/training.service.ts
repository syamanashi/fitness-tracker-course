import { Injectable } from '@angular/core';
import { DocumentChangeAction, AngularFirestore } from '@angular/fire/firestore';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Exercise } from './training/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();

  private exercise: Exercise;
  private exercises: Exercise[] = [];
  private exercisesDone: Exercise[] = [];

  get runningExercise() {
    return { ...this.exercise };
  }

  get doneExercises() {
    return this.exercisesDone.slice();
  }

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    return this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        // tap(docArray => console.log('docArray', docArray)),
        map((docArray: DocumentChangeAction<{}>[]) => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Exercise;
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.exercises = exercises;
        this.exercisesChanged.next([...exercises]);
      });
  }

  startExercise(selectedId: string) {
    this.exercise = this.exercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.exercise });
    // this.db
    //   .doc(`availableExercises/${selectedId}`)
    //   .snapshotChanges()
    //   .pipe(
    //     tap(doc => console.log('doc', doc)),
    //     map(doc => {
    //       console.log('doc', doc);
    //       this.exercise = {
    //         id: doc.payload.id,
    //         ...doc.payload.data(),
    //       } as Exercise;
    //     })
    //   );
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
