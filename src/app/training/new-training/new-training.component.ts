import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { TrainingService } from 'src/app/training.service';
import { Exercise } from '../exercise.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  availableExercises: Observable<Exercise[]>;

  constructor(public trainingService: TrainingService, private db: AngularFirestore) {}

  ngOnInit() {
    this.availableExercises = this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Exercise;
          });
        })
      );
    // .subscribe(result => console.log('snapshotChnges', result));
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
