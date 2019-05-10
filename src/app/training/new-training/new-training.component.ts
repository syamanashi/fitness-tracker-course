import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  constructor(public trainingService: TrainingService) {}

  ngOnInit() {}

  onStartTraining() {
    this.trainingService.startExercise('temp');
  }
}
