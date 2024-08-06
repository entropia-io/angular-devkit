import {Directive, EventEmitter, HostBinding, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, ReplaySubject, Subject, Subscription} from 'rxjs';

@Directive({
  selector: '[ngxDragAndDrop]',
  exportAs: 'ngxDragAndDrop',
  standalone: true
})
export class DragAndDropDirective implements OnInit, OnDestroy {

  @HostBinding('class.dragover')
  public dragover: boolean = false;

  @Output() public filesDropped: EventEmitter<File[]> = new EventEmitter<File[]>();

  private dragoverSubscription: Subscription | null = null;
  private readonly dragoverSubject: Subject<boolean> = new ReplaySubject<boolean>(1);

  constructor() {
  }

  public ngOnDestroy(): void {
    if (!!this.dragoverSubscription) {
      this.dragoverSubscription.unsubscribe();
    }
  }

  public ngOnInit(): void {
    this.dragoverSubscription = this.dragoverSubject
      .pipe(
        distinctUntilChanged(),
        debounceTime(20)
      )
      .subscribe(over => {
        this.dragover = over;
      });
  }

  @HostListener('dragover', ['$event'])
  public onDragOver($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dragoverSubject.next(true);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dragoverSubject.next(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dragoverSubject.next(false);
    if (!!$event && !!$event.dataTransfer && !!$event.dataTransfer.files && $event.dataTransfer.files.length > 0) {
      const files: File[] = [];
      for (let i = 0; i < $event.dataTransfer.files.length; i++) {
        const file = $event.dataTransfer.files[i];
        if (!!file && file.type !== 'text' && file.type !== '') {
          files.push(file);
        }
      }
      this.filesDropped.emit(files);
    }
  }

}
