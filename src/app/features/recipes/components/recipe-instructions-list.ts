import {Component, input} from '@angular/core';
import {Instruction} from '../models/instruction';

@Component({
  selector: 'app-recipe-instructions-list',
  imports: [],
  template: `
    <h2 class="font-bold mb-2">Instructions</h2>
    <ol class="list-decimal space-y-1">
      @for (instruction of instructions(); track instruction.id) {
        <li>{{ instruction.text }}</li>
      }
    </ol>
  `,
  styles: ``,
})
export class RecipeInstructionsList {
  instructions = input.required<Instruction[]>();
}
