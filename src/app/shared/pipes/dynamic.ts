import { Pipe, PipeTransform, Injector, Type } from '@angular/core';

@Pipe({
  name: 'dynamicPipe',
  standalone: true,
})
export class DynamicPipe implements PipeTransform {

  constructor(private parentInjector: Injector) {}

  transform(
    value: unknown,
    pipeType: Type<PipeTransform> | null | undefined,
    pipeArgs?: unknown
  ): unknown {

    if (!pipeType || typeof pipeType !== 'function') {
      return value;
    }

    // Create a child injector that can instantiate the dynamic pipe
    const injector = Injector.create({
      providers: [{ provide: pipeType, useClass: pipeType }],
      parent: this.parentInjector
    });

    const pipeInstance = injector.get(pipeType);

    if (!pipeInstance?.transform) {
      throw new Error(`Provided pipe does not implement PipeTransform: ${pipeType.name}`);
    }

    return pipeInstance.transform(value, pipeArgs);
  }
}
