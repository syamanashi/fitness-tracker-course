import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingService } from 'src/app/training.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss'],
})
export class PastTrainingsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.dataSource.data = this.trainingService.doneExercises;
    this.dataSource.sort = this.sort;
  }
}
