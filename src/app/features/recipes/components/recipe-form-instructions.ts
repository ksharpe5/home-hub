import {Component, input, OnInit, signal} from '@angular/core';
import {Recipe} from '../models/recipe';
import {Instruction} from '../models/instruction';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CdkScrollable} from '@angular/cdk/overlay';

@Component({
  selector: 'app-recipe-form-instructions',
  imports: [
    CdkDrag,
    CdkDropList,
    MatIcon,
    MatIconButton,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CdkScrollable
  ],
  template: `
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-4">
        <mat-form-field>
          <mat-label>Text</mat-label>
          <textarea matInput
                    type="text"
                    placeholder="How to complete this step..."
                    rows="6"
                    [formControl]="instructionFormControl">
                </textarea>
        </mat-form-field>

        <button matButton="filled" (click)="addInstruction()">Add Instruction</button>
      </div>

      <div cdkDropList class="drag-list" (cdkDropListDropped)="dropInstruction($event)" cdkScrollable>
        @for (instruction of instructions(); track instruction) {
          <div class="drag-box" cdkDrag [cdkDragStartDelay]="200">
            {{ instruction.text }}
            <button matIconButton (click)="removeInstruction(instruction)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class RecipeFormInstructions implements OnInit {
  recipe = input.required<Recipe | undefined>();
  instructions = signal<Partial<Instruction>[]>([]);
  instructionFormControl = new FormControl('');

  ngOnInit() {
    this.instructions.set(this.recipe()?.instructions ?? []);
  }

  addInstruction() {
    const newInstruction: Partial<Instruction> = {
      recipeId: this.recipe()?.id ?? undefined,
      text: this.instructionFormControl.value!
    };
    this.instructions.update(current => [...current, newInstruction]);
    this.instructionFormControl.setValue('');
  }

  removeInstruction(instruction: Partial<Instruction>) {
    this.instructions.update(current =>
      current.filter(e => e !== instruction)
    );
  }

  dropInstruction(event: CdkDragDrop<Instruction[]>) {
    moveItemInArray(this.instructions(), event.previousIndex, event.currentIndex);
  }

  getCurrentValues(): Partial<Instruction>[] {
    let sequenceNumber = 0;
    this.instructions().map(i => i.sequenceNumber = sequenceNumber++);
    return this.instructions();
  }
}
